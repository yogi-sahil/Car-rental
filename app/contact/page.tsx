import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ArrowIcon, MapIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { businessDetails, siteUrl } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Financer Car Rental Jaipur",
  description: "Contact Financer for self-drive car availability, Durgapura location, Jaipur pickup hubs and Rajasthan trip planning.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: "Financer Car Rental",
    url: siteUrl,
    telephone: businessDetails.phoneHref,
    email: businessDetails.email,
    founder: { "@type": "Person", name: businessDetails.owner },
    address: { "@type": "PostalAddress", streetAddress: "Durgapura", addressLocality: "Jaipur", addressRegion: "Rajasthan", addressCountry: "IN" },
    areaServed: { "@type": "City", name: "Jaipur" },
    openingHours: "Mo-Su 00:00-23:59",
  };

  return (
    <main>
      <JsonLd data={schema} />
      <PageHero eyebrow="CONTACT FINANCER" title="A real Jaipur team, one message away." description="Ask about a car, pickup hub, KYC or route. We’ll reply with the useful details—not a sales script." />
      <section className="section container contact-grid">
        <div className="contact-options">
          <a href={`tel:${businessDetails.phoneHref}`}><PhoneIcon /><span><small>Call anytime · Open 24×7</small><strong>{businessDetails.phone}</strong></span><ArrowIcon /></a>
          <a href={`https://wa.me/${businessDetails.whatsappNumber}`} target="_blank" rel="noreferrer"><WhatsAppIcon /><span><small>Fastest for availability</small><strong>Chat on WhatsApp</strong></span><ArrowIcon /></a>
          <a href={`mailto:${businessDetails.email}`}><span className="mail-symbol">@</span><span><small>Email support</small><strong>{businessDetails.email}</strong></span><ArrowIcon /></a>
        </div>
        <aside className="contact-location">
          <MapIcon />
          <span className="kicker">BUSINESS & SERVICE AREA</span>
          <h2>Durgapura, Jaipur</h2>
          <p><strong>Owner: {businessDetails.owner}</strong><br />Serving customers across Jaipur. Pickup is offered through scheduled hubs; the exact handover point and time are shared after confirmation.</p>
          <div className="contact-location-pills"><span>Open 24×7</span><span>Durgapura base</span><span>Jaipur service area</span></div>
          <div className="contact-location-actions"><a className="button button-light" href={businessDetails.mapsUrl} target="_blank" rel="noreferrer">View on Google Maps <ArrowIcon /></a><Link className="button button-primary" href="/booking">Request a car <ArrowIcon /></Link></div>
        </aside>
      </section>
    </main>
  );
}
