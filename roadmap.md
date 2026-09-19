# Roadmap

- [ ] Moot Court registration page (/moot-court): student details form → pay $18 (≈K350) → confirmation email.
  - [x] Payments enabled (test + live), product moot_court_package, price moot_court_full ($18)
  - [x] Checkout plumbing: paddle.ts, usePaddleCheckout, get-paddle-price function (deployed, verified)
  - [x] Registrations table + save registration before checkout (anon insert fixed)
  - [x] Registration page + thank-you page (/moot-court/success), routes, service card links to it
  - [x] payments-webhook: marks registration paid on transaction.completed (deployed)
  - [ ] Verify end-to-end: form → checkout overlay opens
  - [ ] Confirmation email (blocked: email domain setup for lmvacademy.com not started — needs user DNS action)
- [ ] Full payments/business-logic audit: catalog, auth, payment, account mgmt, entitlement, renewal. Report gaps, ask user questions, implement fixes, write preview test guide with test card.
- [ ] Go-live walkthrough: policy pages (Terms, Refund, Privacy), verification in Payments tab, publish for live link. Needs user's legal business name.
- [ ] Contact form sends enquiries to nketurah@lmvacademy.com (also depends on email domain setup)
