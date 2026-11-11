# DUCES Consultancy Services — Website

Official static website for DUCES Consultancy Services.

## Website

https://chetan7025.github.io/Duces-Website-V3/

## Brand system

| Colour | Hex | Usage |
|---|---|---|
| Classic Royal Blue | #123B70 | Primary brand and footer |
| Corporate Blue | #1976B9 | Supporting blue and links |
| Emerald Green | #008F6B | Primary accent and actions |
| Champagne Gold | #D9AD55 | Restrained premium accent |
| White | #FFFFFF | Main surfaces |
| Light Background | #F5F7FA | Soft section backgrounds |
| Soft Silver | #E5EBF1 | Borders and dividers |

Typography: Manrope for headings and DM Sans for body copy.

## Site structure

- `index.html` — Home
- `about.html` — About DUCES
- `business-setup.html` — Business setup
- `business-bank-account.html` — Business bank accounts
- `business-loan.html` — Business finance
- `mortgage-loan.html` — Mortgage finance
- `accounting-bookkeeping.html` — Accounting and bookkeeping
- `vat-corporate-tax.html` — VAT and corporate tax
- `pro-visa-services.html` — PRO and visa services
- `contact.html` — Contact and enquiry form
- `thank-you.html` — Enquiry confirmation
- `privacy-policy.html` — Privacy policy
- `terms.html` — Terms and conditions

## Shared assets

- `assets/script.js` — Shared navigation, dropdown, mobile menu and form interactions
- `assets/style.css` — Base site styles
- `assets/v3-system.css` — Shared visual system, header, dropdown and responsive page-introduction styles
- `assets/duces-logo.jpg` — Company logo
- `assets/duces-hero.jpg` — Homepage hero image

All main content pages use the same navigation structure and shared interaction script. Keep global navigation and site-wide visual changes in the shared assets rather than introducing page-specific header variations.

## Contact

**Email:** chetanpatil.2798@gmail.com  
**Phone / WhatsApp:** +971 50 535 6966  
**WhatsApp:** https://wa.me/971505356966

## Enquiry form

The contact form uses FormSubmit and sends enquiries to the email address above. FormSubmit may require initial email activation. Test an enquiry after publishing and confirm both email delivery and the thank-you redirect.

## GitHub Pages publishing

The site is published from the `main` branch and repository root (`/ `). After code updates, check the GitHub Actions workflow named **pages build and deployment** before testing the live site.

## Pre-launch checks

- [ ] Home and all service pages open.
- [ ] Header, dropdowns and mobile navigation work consistently.
- [ ] Page introductions and hero panels display consistently.
- [ ] All local links and images load.
- [ ] Contact form submits and reaches the correct inbox.
- [ ] Thank-you, privacy and terms pages open.
- [ ] WhatsApp links open the correct number.
- [ ] Check desktop, tablet and mobile layouts.

---

© DUCES Consultancy Services. All Rights Reserved.
