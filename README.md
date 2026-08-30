# Financer Car Rental Jaipur

A multi-page, mobile-first self-drive car rental website for Jaipur and nearby Rajasthan road trips. The UI uses a warm Jaipur-inspired editorial system, real vehicle photography, local destination imagery, and a Flatpickr date-range experience.

## Final project location

`/Users/sahilyogi/Desktop/Self Project/Car Rental Project`

The working copy is mirrored there after development and QA.

## Run locally

```bash
npm install
npm run dev
```

## Google Sheets lead capture

1. Import `outputs/leads/financer-car-rental-leads.xlsx` into Google Drive as a native Google Sheet.
2. In that Sheet, open Extensions → Apps Script and paste `google-apps-script/Code.gs`.
3. Deploy the script as a Web app, executing as yourself, with access set to Anyone.
4. Copy `.env.example` to `.env.local` and add the Web app `/exec` URL plus the real WhatsApp number.
5. Restart or redeploy the website, then submit a test enquiry and confirm that a row appears in the `Leads` tab.

The booking flow always prepares WhatsApp as the customer-facing handoff. When the Sheets endpoint is configured, the same enquiry is also captured with a unique booking ID and UTM attribution. The browser keeps a local backup of the submitted payload if the Sheets endpoint is unavailable.

Open `http://localhost:3000`.

## Main routes

- `/` — self-drive-first home page
- `/self-drive-car-rental-jaipur` — focused Jaipur service landing page
- `/cars` and `/cars/[slug]` — fleet index and individual car details
- `/pickup-locations` and `/pickup-locations/[slug]` — six Jaipur pickup-area guides
- `/locations` and `/locations/[slug]` — Jaipur and nearby road-trip guides
- `/booking` — detailed booking enquiry form
- `/about`, `/faq`, `/terms`, `/contact` — supporting information and rental-policy pages

## Booking-oriented UX

- Body-style price discovery for hatchback, sedan and SUV/MUV categories
- Responsive direct-image hero carousel with automatic and manual car slides
- Global search for cars, Jaipur pickup areas, road trips and booking pages
- Compact mobile header, accessible navigation panel and redesigned footer
- Responsive full wordmark plus matching favicon, app icon and light footer logo
- Exact 24-hour prices with 300 km included on every listed car
- Fleet cards with package guidance plus direct Call and WhatsApp actions
- Ten distinct fleet options with individual detail pages and Jaipur-themed vehicle imagery
- Doorstep delivery messaging with confirmation-before-payment language
- Separate document checklists for Indian residents and international visitors

## Discovery and SEO foundations

- Route-specific titles, descriptions, canonical URLs, and Open Graph metadata
- `CarRental`, `Product`, `TouristDestination`, `FAQPage`, and breadcrumb JSON-LD
- Generated `/sitemap.xml` and `/robots.txt`
- `/llms.txt` and `/llms-full.txt` summaries for AI retrieval tools
- Internal links, descriptive URLs, static generation, and image-aware sitemap entries

## Verification

```bash
npm run typecheck
npm run build
```

Before production launch, verify the public domain (`financercarrental.in`), pricing, KYC terms, insurance terms and availability policy. Business contact details currently use the verified details supplied for owner Sachin Jaat.
