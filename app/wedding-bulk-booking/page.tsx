import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cars, siteUrl, weddingCombos } from "@/lib/data";
import { ArrowIcon, CheckIcon, MapIcon, PhoneIcon, StarIcon, WhatsAppIcon } from "@/components/icons";
import { WeddingFleetBuilder } from "@/components/wedding-fleet-builder";
import { WeddingConsultForm } from "@/components/wedding-consult-form";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Wedding Car Rental & Multi-Car Fleet Booking Jaipur | Financer",
  description:
    "Book luxury SUV convoys and multi-car fleets for Jaipur weddings, Baraat entries, palace destination events, and VIP guest escort. Tailored packages, standby vehicles & palace delivery.",
  alternates: { canonical: `${siteUrl}/wedding-bulk-booking` },
  openGraph: {
    title: "Royal Wedding Fleets & Multi-Car Convoys Jaipur | Financer",
    description:
      "Curated multi-car SUV packages for Baraat, VIP convoys, and palace wedding guest logistics in Jaipur. Fortuner, Scorpio N, and Thar fleets.",
    url: `${siteUrl}/wedding-bulk-booking`,
    images: [{ url: `${siteUrl}/images/wedding-hero-fleet.webp`, width: 1536, height: 1024, alt: "Luxury Wedding Fleet Jaipur" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding & Bulk Car Rentals Jaipur | Financer",
    description: "Royal multi-car fleets for weddings, Baraat convoys, and VIP hospitality in Jaipur.",
    images: [`${siteUrl}/images/wedding-hero-fleet.webp`],
  },
};

const palaceVenues = [
  "Fairmont Jaipur",
  "Rambagh Palace",
  "The Leela Palace",
  "Jai Mahal Palace",
  "Samode Palace & Haveli",
  "Chomu Palace Hotel",
  "JW Marriott Resort",
  "Alila Fort Bishangarh",
];

const bulkFaqs = [
  [
    "How does pricing work for wedding and multi-car bulk bookings?",
    "Unlike single-day rentals, multi-car wedding bookings are priced on a tailored proposal basis. Rates depend on the number of vehicles, duration (2 to 5 days), self-drive vs chauffeur preference, and palace delivery locations. We offer substantial bundled discounts compared to individual car bookings.",
  ],
  [
    "Can we decorate the cars with ribbons and flowers for the Baraat?",
    "Yes, subtle silk ribbons and minimal non-damaging flower decor are permitted on lead and groom vehicles. We provide cars in immaculate ceramic-detailed condition so they look spectacular in photography and videography.",
  ],
  [
    "Do you deliver all the cars together at the palace or hotel?",
    "Yes. Our Fleet Coordinator manages synchronized on-time delivery of all vehicles directly to your venue (Fairmont, Rambagh, Leela, Samode, etc.) with full fuel tanks, FastTags, and spotless cleaning.",
  ],
  [
    "Is a standby backup vehicle provided for emergency needs?",
    "Yes. For all 5+ vehicle wedding convoys, we keep a standby backup vehicle on priority call in Jaipur to ensure zero disruption during crucial wedding events.",
  ],
  [
    "What documents are required for multi-car booking?",
    "A single primary coordinator / family member ID, event schedule confirmation, and driving licences for the designated drivers. Our team coordinates everything in advance to avoid last-minute delays.",
  ],
] as const;

export default function WeddingBulkBookingPage() {
  const weddingSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/wedding-bulk-booking#service`,
    name: "Wedding Car Rental & Multi-Car Fleet Booking Jaipur",
    serviceType: "Luxury Wedding Fleet & Multi-Car Convoy Rental",
    provider: { "@type": "LocalBusiness", name: "Financer Car Rental Jaipur", url: siteUrl },
    areaServed: { "@type": "City", name: "Jaipur" },
    description:
      "Tailored multi-car convoy packages for weddings, Baraat entries, palace events, and guest logistics in Jaipur.",
    image: `${siteUrl}/images/wedding-hero-fleet.webp`,
  };

  return (
    <main className="wedding-page">
      <JsonLd data={weddingSchema} />

      {/* Royal Wedding Hero Section */}
      <section className="wedding-hero">
        <div className="container wedding-hero-grid">
          <div className="wedding-hero-copy">
            <div className="wedding-badge">
              <StarIcon /> <span>ROYAL FLEETS & EVENT CONVOYS · JAIPUR</span>
            </div>
            <h1>Royal fleets for grand weddings & VIP events.</h1>
            <p>
              Elevate your Baraat entry, groom escort, and palace destination logistics with coordinated multi-SUV
              convoys in Jaipur. Tailored multi-car packages, spotless ceramic-detailed cars, and dedicated on-site fleet
              coordination.
            </p>

            <div className="wedding-hero-actions">
              <a className="button button-primary" href="#convoy-builder">
                Build your convoy <ArrowIcon />
              </a>
              <a className="button button-light" href="#wedding-consult-section">
                Request custom quote
              </a>
            </div>

            <div className="wedding-hero-perks">
              <span>
                <CheckIcon /> Synchronized Palace Handover
              </span>
              <span>
                <CheckIcon /> Standby Backup Vehicle
              </span>
              <span>
                <CheckIcon /> Dedicated Fleet Manager
              </span>
            </div>
          </div>

          <div className="wedding-hero-visual">
            <Image
              src="/images/wedding-hero-fleet.webp"
              alt="Luxury wedding car convoy parked outside a heritage palace in Jaipur"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <div className="wedding-visual-badge">
              <small>CONVOY READY</small>
              <strong>Toyota Fortuner & Scorpio N Fleets</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Highlights Bar */}
      <section className="wedding-trust-bar">
        <div className="container wedding-trust-grid">
          <div>
            <strong>100%</strong>
            <span>Spotless Ceramic Detailed</span>
          </div>
          <div>
            <strong>Palace Delivery</strong>
            <span>Rambagh, Fairmont & Leela</span>
          </div>
          <div>
            <strong>24×7 Standby</strong>
            <span>Backup Car on Call</span>
          </div>
          <div>
            <strong>Single Manager</strong>
            <span>Zero Coordination Hassle</span>
          </div>
        </div>
      </section>

      {/* Curated Wedding Combos Section */}
      <section className="section container wedding-combos-section" id="curated-combos">
        <div className="section-head">
          <div>
            <span className="kicker">CURATED FLEET COMBOS</span>
            <h2>Signature wedding convoys for Jaipur events</h2>
            <p>
              Pre-designed vehicle mixes tested for grand Baraat entries, VIP artist movements, and comfortable guest
              logistics.
            </p>
          </div>
        </div>

        <div className="wedding-combos-grid">
          {weddingCombos.map((combo) => (
            <article className="combo-card" key={combo.id}>
              <div className="combo-image-wrap">
                <Image src={combo.image} alt={combo.name} fill sizes="(max-width: 900px) 100vw, 33vw" />
                <span className="combo-tag">{combo.tag}</span>
                <div className="combo-metrics-pill">
                  <span>{combo.totalVehicles}</span>
                  <span>·</span>
                  <span>{combo.seatingCapacity}</span>
                </div>
              </div>

              <div className="combo-body">
                <span className="combo-eyebrow">{combo.eyebrow}</span>
                <h3>{combo.name}</h3>
                <p>{combo.summary}</p>

                <div className="combo-fleet-box">
                  <strong>Fleet Mix:</strong>
                  <ul>
                    {combo.fleetComposition.map((item, idx) => (
                      <li key={idx}>
                        <CheckIcon /> <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="combo-highlights">
                  {combo.highlights.map((h, i) => (
                    <span key={i}>{h}</span>
                  ))}
                </div>

                <div className="combo-footer">
                  <a className="button button-primary combo-cta-btn" href="#wedding-consult-section">
                    Consult for this Combo <ArrowIcon />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Convoy Builder Component */}
      <section className="section wedding-builder-section">
        <div className="container">
          <WeddingFleetBuilder cars={cars} />
        </div>
      </section>

      {/* Wedding Consultation Form Section */}
      <section className="section container">
        <WeddingConsultForm />
      </section>

      {/* Palace Venues Handled */}
      <section className="wedding-venues-section">
        <div className="container">
          <div className="venues-head">
            <span className="kicker">SEAMLESS DESTINATION LOGISTICS</span>
            <h2>Direct handover at Jaipur’s premier wedding palaces</h2>
            <p>
              We coordinate directly with hotel concierges and wedding planners to ensure your cars are parked, detailed,
              and ready before guests arrive.
            </p>
          </div>

          <div className="venues-pills-grid">
            {palaceVenues.map((venue) => (
              <div className="venue-pill" key={venue}>
                <MapIcon /> <span>{venue}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Coordination Steps */}
      <section className="section container wedding-process-section">
        <div className="section-head">
          <div>
            <span className="kicker">HOW WE WORK WITH WEDDING FAMILIES</span>
            <h2>4-Step flawless fleet coordination</h2>
          </div>
        </div>

        <div className="wedding-steps-grid">
          <div className="wedding-step-card">
            <span>01</span>
            <h3>Tell us your itinerary</h3>
            <p>Share your wedding dates, palace venue, expected car count and whether you prefer self-drive or driver support.</p>
          </div>
          <div className="wedding-step-card">
            <span>02</span>
            <h3>Custom Fleet Proposal</h3>
            <p>Our Fleet Manager prepares a bundled custom quotation within 30 minutes with multi-car discounts and vehicle allotments.</p>
          </div>
          <div className="wedding-step-card">
            <span>03</span>
            <h3>Trial & Vehicle Inspection</h3>
            <p>Visit our Jaipur hub or request photo/video verification of your exact vehicles prior to final locking.</p>
          </div>
          <div className="wedding-step-card">
            <span>04</span>
            <h3>Synchronized Palace Delivery</h3>
            <p>All cars arrive detailed, fuel-filled and staged symmetrically at your palace driveway right on schedule.</p>
          </div>
        </div>
      </section>

      {/* Bulk FAQs */}
      <section className="section container wedding-faq-section">
        <div className="section-head">
          <div>
            <span className="kicker">FREQUENTLY ASKED QUESTIONS</span>
            <h2>Everything about multi-car wedding bookings</h2>
          </div>
        </div>

        <div className="faq-list">
          {bulkFaqs.map(([question, answer], index) => (
            <details key={index}>
              <summary>
                {question}
                <span>+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>

      </section>

      {/* Direct Contact Callout */}
      <section className="wedding-direct-cta">
        <div className="container wedding-direct-inner">
          <div>
            <span className="kicker">NEED IMMEDIATE EVENT FLEET ASSISTANCE?</span>
            <h2>Speak with our Jaipur Wedding Fleet Manager directly.</h2>
            <p>Available 24×7 to customize convoy sizes, inspect vehicles, and assist wedding planners.</p>
          </div>
          <div className="wedding-direct-actions">
            <a className="button button-light" href="tel:+919602111420">
              <PhoneIcon /> Call +91 96021 11420
            </a>
            <a
              className="button button-whatsapp"
              href="https://wa.me/919602111420?text=Hi%20Financer%2C%20I%20need%20to%20discuss%20a%20wedding%20multi-car%20fleet%20booking%20in%20Jaipur."
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon /> WhatsApp Concierge
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
