const API_BASE_URL = (import.meta.env.VITE_AARAV_API_BASE_URL || "").replace(
  /\/$/,
  "",
);
const API_LEAD_ENDPOINT = `${API_BASE_URL}/api/v1/aarav-eye-care/register`;
const APPS_SCRIPT_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzJ7il5zL8lp7XhIcmvSpVYGpVfqiH_J7R3IbGpdQdkmVeAGWwm7LigaasHmVDVGILr/exec";
const CLIENT_KEY = "aarav_eye_care";

export const fetchVisitorIp = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data?.ip || "";
  } catch (error) {
    console.warn("IP fetch failed", error);
    return "";
  }
};

const submitToPrimaryApi = async ({
  name,
  phone,
  mobile_number,
  service,
  ip_address,
  utm_source,
}) => {
  const response = await fetch(API_LEAD_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Client-Key": CLIENT_KEY,
    },
    body: JSON.stringify({
      name,
      mobile_number: mobile_number || phone || "",
      service,
      ip_address: ip_address || "",
      utm_source: utm_source || "Direct",
    }),
  });

  if (!response.ok) {
    let message = "Lead submission failed";

    try {
      const payload = await response.json();
      message = payload?.message || message;
    } catch (error) {
      // Keep the generic message when the server does not return JSON.
    }

    throw new Error(message);
  }

  try {
    return await response.json();
  } catch (error) {
    return { ok: true };
  }
};

const submitToAppsScript = async ({
  name,
  phone,
  mobile_number,
  service,
  ip_address,
  utm_source,
  message,
  source,
}) => {
  const params = new URLSearchParams();
  const fallbackPayload = {
    name,
    phone: phone || mobile_number || "",
    service,
    ip_address: ip_address || "",
    utm_source: utm_source || "Direct",
    message: message || "",
  };

  if (source) {
    fallbackPayload.source = source;
  }

  Object.entries(fallbackPayload).forEach(([key, value]) => {
    params.append(
      key,
      value !== undefined && value !== null ? String(value) : "",
    );
  });

  const response = await fetch(APPS_SCRIPT_ENDPOINT, {
    method: "POST",
    body: params,
  });

  if (!response.ok) {
    throw new Error("Apps Script submission failed");
  }

  return true;
};

export const submitAaravLead = async (payload) => {
  try {
    return await submitToPrimaryApi(payload);
  } catch (apiError) {
    console.warn(
      "Primary Aarav API submission failed, falling back to Apps Script",
      apiError,
    );
    return submitToAppsScript(payload);
  }
};
