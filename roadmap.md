# Roadmap

- [ ] Moot Court registration page (/moot-court): student details form → pay $18 (≈K350) → confirmation email.
  - [x] Payments enabled (test + live), product moot_court_package, price moot_court_full ($18)
  - [x] Checkout plumbing: paddle.ts, usePaddleCheckout, get-paddle-price function (deployed)
  - [ ] Verify price resolution works after LOVABLE_API_KEY fix
  - [ ] Registrations table + save registration before checkout
  - [ ] Registration page with form, linked from Moot Court service card
  - [ ] payments-webhook: mark registration paid on transaction.completed
  - [ ] Confirmation email (blocked: email domain setup for lmvacademy.com not started — needs user DNS action)
- [ ] Go-live walkthrough: policy pages (Terms, Refund, Privacy), verification in Payments tab, publish for live link. Needs user's legal business name.
- [ ] Contact form sends enquiries to nketurah@lmvacademy.com (also depends on email domain setup)
