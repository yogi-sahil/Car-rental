import Link from "next/link";
import { businessDetails, destinations, pickupLocations } from "@/lib/data";
import { ArrowIcon, MapIcon, PhoneIcon, WhatsAppIcon } from "./icons";
import { BrandLogo } from "./brand-logo";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-cta-row">
        <div><span className="kicker">DRIVE JAIPUR YOUR WAY</span><h2>Need the right car for your plan?</h2><p>Tell us your dates, pickup area and destination. We’ll help match the car.</p></div>
        <div><Link className="button button-light" href="/booking">Check availability <ArrowIcon /></Link><a className="footer-whatsapp" href={`https://wa.me/${businessDetails.whatsappNumber}`} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp</a></div>
      </div>
      <div className="container footer-main">
        <div className="footer-brand"><Link className="brand brand-light" href="/" aria-label="Financer Car Rental home"><BrandLogo light /></Link><p>14 verified self-drive cars with 24-hour, 300-km packages for Jaipur city days and Rajasthan road trips.</p><div className="footer-contact-pills"><a href={`tel:${businessDetails.phoneHref}`}><PhoneIcon /> {businessDetails.phone}</a><a href={businessDetails.mapsUrl} target="_blank" rel="noreferrer"><MapIcon /> Durgapura, Jaipur</a><span>Open 24×7</span></div></div>

        <div className="footer-links"><div><strong>Explore</strong><Link href="/cars">Cars</Link><Link href="/wedding-bulk-booking">Wedding & Combos</Link><Link href="/pickup-locations">Pickup locations</Link><Link href="/locations">Road trips</Link><Link href="/self-drive-car-rental-jaipur">How it works</Link></div><div><strong>Popular drives</strong>{destinations.slice(0, 4).map((item) => <Link href={`/locations/${item.slug}`} key={item.slug}>{item.name}</Link>)}</div><div><strong>Pickup areas</strong>{pickupLocations.slice(0, 4).map((item) => <Link href={`/pickup-locations/${item.slug}`} key={item.slug}>{item.name}</Link>)}</div><div><strong>Company</strong><Link href="/about">About Financer</Link><Link href="/faq">FAQs</Link><Link href="/terms">Rental terms</Link><Link href="/contact">Contact</Link><a href={`mailto:${businessDetails.email}`}>Email support</a></div></div>

      </div>
      <div className="container footer-bottom"><span>© 2026 Financer Car Rental · Proprietor: {businessDetails.owner}</span><span>Listed packages cover 24 hours and 300 km; final availability is confirmed.</span><div><Link href="/terms">Terms</Link><Link href="/terms#privacy">Privacy</Link><Link href="/contact">Support</Link></div></div>
    </footer>
  );
}
