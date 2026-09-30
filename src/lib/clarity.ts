/** Values used for Clarity's Environment custom filter. */
export const CLARITY_ENV = {
  TEST: 'Test',
  PRODUCTION: 'Production',
} as const;

export type ClarityEnvironment = (typeof CLARITY_ENV)[keyof typeof CLARITY_ENV];

const CLARITY_TEST_STORAGE_KEY = 'clarityTest';

/** Reads the browser-only preference without making server rendering depend on it. */
export function getClarityEnvironment(): ClarityEnvironment {
  if (typeof window === 'undefined') {
    return CLARITY_ENV.PRODUCTION;
  }

  return window.localStorage.getItem(CLARITY_TEST_STORAGE_KEY) === 'true'
    ? CLARITY_ENV.TEST
    : CLARITY_ENV.PRODUCTION;
}

/** Persists the preference and labels the current Clarity session immediately. */
export function setClarityEnvironment(environment: ClarityEnvironment): void {
  if (typeof window === 'undefined') return;

  if (environment === CLARITY_ENV.TEST) {
    window.localStorage.setItem(CLARITY_TEST_STORAGE_KEY, 'true');
  } else {
    window.localStorage.removeItem(CLARITY_TEST_STORAGE_KEY);
  }

  window.clarity?.('set', 'Environment', environment);
}

/** Applies the saved preference when the React application first loads. */
export function applyClarityEnvironment(): ClarityEnvironment {
  const environment = getClarityEnvironment();
  window.clarity?.('set', 'Environment', environment);
  return environment;
}
