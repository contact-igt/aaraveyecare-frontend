# Aarav Eye Care Frontend And Google Sheet Structure

This document maps the current Vite + React frontend structure and the form data sent to Google Sheets through the Apps Script endpoint.

## 1. Project Overview

- Framework: React 19 + Vite
- Styling: Tailwind CSS
- Routing: `react-router-dom`
- Form handling: `react-hook-form`
- Icons: `lucide-react`
- Data submission: Google Apps Script web app endpoint

## 2. Top-Level File Structure

```text
.
root
  index.html
  package.json
  vite.config.js
  vercel.json
  README.md
  public/
    assets/
    videos/
  src/
    App.jsx
    App.css
    index.css
    main.jsx
    context/
      ModalContext.jsx
    components/
      AppointmentForm.jsx
      EyeCareCenters.jsx
      FaqSection.jsx
      FloatingActions.jsx
      Footer.jsx
      Header.jsx
      HeroSection.jsx
      InsuranceSection.jsx
      PopupForm.jsx
      ServicesGrid.jsx
      ThankYou.jsx
      TextTestimonials.jsx
      VideoTestimonials.jsx
      WhyUsSection.jsx
      ExperienceSection.jsx
```

## 3. App Entry Flow

### `src/main.jsx`

- Mounts the app into `#root`
- Imports the global stylesheet from `src/index.css`
- Renders `<App />` inside `React.StrictMode`

### `src/App.jsx`

The app is wrapped in `ModalProvider`, then `BrowserRouter`, then the common shell.

Current render order:

1. `Header`
2. Route content
3. `Footer`
4. `FloatingActions`
5. `PopupForm`

Routes:

- `/` renders the landing page
- `/thank-you` renders the success page

## 4. Landing Page Structure

The landing page is assembled from these sections in this order:

1. `HeroSection`
2. `VideoTestimonials`
3. `WhyUsSection`
4. `ServicesGrid`
5. `InsuranceSection`
6. `EyeCareCenters`
7. `TextTestimonials`
8. `FaqSection`
9. `AppointmentForm`

## 5. Component Responsibilities

### `Header.jsx`

- Sticky top navigation shell
- Brand logo
- Call button
- Appointment popup trigger
- Mobile menu toggle

### `HeroSection.jsx`

- Hero banner with brand message
- Doctor image
- Inline callback form
- Sends form data to Google Sheets

### `VideoTestimonials.jsx`

- Horizontal video testimonial carousel
- Play/pause controls
- Drag/swipe interaction

### `WhyUsSection.jsx`

- Two large trust/experience cards
- Uses static brand imagery and metrics

### `ServicesGrid.jsx`

- Clickable service cards
- Opens the shared appointment popup

### `InsuranceSection.jsx`

- Insurance/cashless treatment section
- Opens popup in `cashless` mode

### `EyeCareCenters.jsx`

- Location cards for all centers
- Call, contact, and Google Maps directions
- Opens popup from CTA buttons

### `TextTestimonials.jsx`

- Text review carousel
- Infinite loop behavior

### `FaqSection.jsx`

- Accordion FAQ block

### `AppointmentForm.jsx`

- Main booking form at the bottom of the page
- Sends data to Google Sheets
- Redirects to `/thank-you` on success

### `PopupForm.jsx`

- Global modal form used across the site
- Supports default booking and `cashless` mode
- Sends data to Google Sheets

### `FloatingActions.jsx`

- Floating WhatsApp button
- Desktop right-side action bar
- Mobile bottom action bar

### `Footer.jsx`

- Copyright/footer links

### `ThankYou.jsx`

- Success screen after successful submission
- Embedded YouTube video
- Return-to-home button

### `ExperienceSection.jsx`

- Present in the codebase
- Imported in `App.jsx`, but not currently mounted in the landing page render tree

## 6. Modal Flow

`src/context/ModalContext.jsx` provides shared popup state.

State shape:

- `isPopupOpen`
- `popupType`

Actions:

- `openPopup(type = 'default')`
- `closePopup()`

Popup types currently used:

- `default`
- `cashless`

Popup behavior:

- `InsuranceSection` opens the modal with `cashless`
- Header, services cards, eye care center cards, and floating actions open the modal in default mode
- `PopupForm` changes its copy and submit label based on `popupType`

## 7. Google Sheet Integration

All three booking surfaces submit to the same Apps Script endpoint:

```text
https://script.google.com/macros/s/AKfycbzJ7il5zL8lp7XhIcmvSpVYGpVfqiH_J7R3IbGpdQdkmVeAGWwm7LigaasHmVDVGILr/exec
```

Current submitters:

- `HeroSection`
- `AppointmentForm`
- `PopupForm`

Submission pattern:

1. Collect form values with `react-hook-form`
2. Try to fetch client IP from `https://api.ipify.org?format=json`
3. Read `utm_source` from `localStorage`, defaulting to `Direct`
4. Build `URLSearchParams`
5. POST the params to the Apps Script endpoint
6. On success, reset the form and redirect to `/thank-you`

## 8. Google Sheet Column Structure

Based on the frontend payload, the sheet should expect these columns.

### Shared columns

- `name`
- `phone`
- `service`
- `ip_address`
- `utm_source`
- `message`

### Popup-only column

- `source`

Notes:

- `HeroSection` and `AppointmentForm` do not send `source`
- `PopupForm` sends `source` with one of these values:
  - `Cashless Eligibility Form`
  - `Quick Booking Popup`
- `message` is optional and may be blank

## 9. Suggested Sheet Layout

A practical Google Sheet header row would be:

```text
timestamp | name | phone | service | message | source | ip_address | utm_source
```

Recommended extras if the Apps Script already supports them:

- `status`
- `assigned_to`
- `notes`
- `follow_up_date`

## 10. Submission Sources By Form

### `HeroSection`

- `name`
- `phone`
- `service`
- `ip_address`
- `utm_source`
- `message` is always empty

### `AppointmentForm`

- `name`
- `phone`
- `service`
- `ip_address`
- `utm_source`
- `message` if provided

### `PopupForm`

- `name`
- `phone`
- `service`
- `ip_address`
- `utm_source`
- `source`
- `message` if provided

## 11. Public Assets Used By The UI

Important assets currently referenced in the code:

- `/assets/logo.png`
- `/assets/aaraveyecare.webp`
- `/assets/contact.webp`
- `/assets/insurance.png`
- `/assets/whyus.webp`
- `/assets/whychooseus.webp`
- `/assets/testimonial1.webp` to `/assets/testimonial5.webp`
- `/videos/video1.mp4` to `/videos/video5.mp4`

## 12. Notes For Maintenance

- `App.jsx` currently imports `ExperienceSection` but does not render it.
- The current docs in `README.md` are still the default Vite starter text.
- If the Apps Script changes the column names, update this document and the script mapping together.
- If you add new form fields in the frontend, add the matching Google Sheet headers before release.
