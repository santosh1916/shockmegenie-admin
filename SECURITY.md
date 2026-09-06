# Security Policy

## Reporting a vulnerability

Report security issues privately. **Do not open a public issue, pull request, or discussion
for a suspected vulnerability.**

Email: `security@shockmegenie.com` <!-- confirm this address before launch -->

Include what you found, how to reproduce it, and what an attacker could do with it. Expect
an acknowledgement within three working days.

Please do not run automated scanners against production, access or modify data that is not
yours, or perform any denial-of-service testing.

## Scope

This platform processes payments through Razorpay and stores personal data about people who
never signed up for an account, including recipients' names, ages, addresses, and allergy
information. Issues in the following areas are treated as high severity:

- Anything exposing box contents to a sender or recipient before delivery
- Authentication or authorisation bypass, including staff-role escalation
- Access to another user's orders, recipients, or personal data
- Payment manipulation, including price, tier value, refund amount, or commission
- Bypassing server-side product compliance enforcement

## What we ask of contributors

- Never commit a `.env` file or a real secret.
- Treat any credential that has appeared in a log, screenshot, or chat message as
  compromised, and rotate it.
- Never disable a security control to make a test pass.

Engineering rules: `shockmegenie-docs/Security_Standards.md`.
