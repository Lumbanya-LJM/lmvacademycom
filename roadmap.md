# Roadmap

- [ ] Moot Court registration page (/moot-court): student details form → pay $18 (≈K350) → confirmation email.
  - [x] Payments enabled (test + live), product moot_court_package, price moot_court_full ($18)
  - [x] Checkout plumbing: paddle.ts, usePaddleCheckout, get-paddle-price function (deployed, verified)
  - [x] Registrations table + save registration before checkout (anon insert fixed)
  - [x] Registration page + thank-you page (/moot-court/success), routes, service card links to it
  - [x] payments-webhook: marks registration paid on transaction.completed (deployed)
  - [x] Verify end-to-end: form → checkout overlay opens (verified 201 + sandbox frame)
  - [ ] Sender domain on lmvacademy.com (user action: email setup dialog shown — awaiting completion)
  - [ ] Contact form → enquiry email to nketurah@lmvacademy.com (scaffold transactional email, build form, send test enquiry)
  - [ ] Moot Court confirmation email via webhook (after sender domain active)
- [x] Full payments/business-logic audit: catalog, auth, payment, account mgmt, entitlement, renewal. Report gaps, ask user questions, implement fixes, write preview test guide with test card.
- [ ] Go-live walkthrough: verification in Payments tab, publish for live link. Needs user's legal business name + refund-policy confirmation.
- [x] Policy pages (Privacy /privacy, Terms /terms, Refund /refund) + footer links — refund stance is a draft (7-day before programme starts), confirm with user.
