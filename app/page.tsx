import Image from "next/image";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { CarCard } from "@/components/car-card";
import { DestinationCard } from "@/components/destination-card";
import { JsonLd } from "@/components/json-ld";
import { HeroCarCarousel } from "@/components/hero-car-carousel";
import { InstagramReels } from "@/components/instagram-reels";
import { ScrollCarShowcase } from "@/components/scroll-car-showcase";
import { SiteCta } from "@/components/site-cta";
import { ArrowIcon, CheckIcon, ShieldIcon, StarIcon } from "@/components/icons";
import { businessDetails, cars, destinations, faqs, siteUrl } from "@/lib/data";

export default function Home() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": ["AutoRental", "LocalBusiness"],
      name: "Financer Car Rental",
      url: siteUrl,
      image: `${siteUrl}/images/jaipur-road-self-drive-hero.webp`,
      telephone: businessDetails.phoneHref,

      email: businessDetails.email,
      priceRange: "₹₹",
      areaServed: ["Jaipur", "Rajasthan"],
      founder: { "@type": "Person", name: businessDetails.owner },
      address: { "@type": "PostalAddress", streetAddress: "Durgapura", addressLocality: "Jaipur", addressRegion: "Rajasthan", addressCountry: "IN" },
      openingHours: "Mo-Su 00:00-23:59",
      description: "Verified self-drive car rentals in Jaipur for city drives and Rajasthan road trips.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.slice(0, 4).map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
    },
  ];

  return (
    <main>
      <JsonLd data={schemas} />
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div className="hero-copy">
            <div className="hero-overline"><span>JAIPUR’S SELF-DRIVE CLUB</span><span className="hero-rating">14 cars · 300 km plans</span></div>
            <h1>Your Rajasthan.<br /><em>Your keys.</em></h1>
            <p>Verified cars, transparent plans and the freedom to stop wherever the road feels right.</p>
            <div className="hero-actions"><Link className="button button-primary" href="/booking">Find a car <ArrowIcon /></Link><Link className="text-link" href="/locations">Explore road trips <ArrowIcon /></Link></div>
            <div className="hero-checks"><span><CheckIcon /> No driver</span><span><CheckIcon /> Flexible pickup</span><span><CheckIcon /> 24×7 support</span></div>
          </div>
          <HeroCarCarousel />
        </div>
        <div className="container home-search"><BookingForm /></div>
      </section>

      <section className="trust-bar"><div className="container trust-bar-grid"><div><strong>14</strong><span>self-drive cars</span></div><div><strong>6</strong><span>Jaipur pickup locations</span></div><div><strong>24×7</strong><span>roadside support</span></div><div><strong>300</strong><span>km included per plan</span></div></div></section>


      <section className="category-section container" aria-labelledby="category-title">
        <div className="category-intro"><span className="kicker">BUDGET BY BODY STYLE</span><h2 id="category-title">Start with the shape<br />that fits your trip.</h2><p>Quick starting-price guidance before you compare individual cars.</p></div>
        <div className="category-cards">
          <Link href="/cars" className="category-card"><span>01</span><div><small>Easy city drives</small><strong>Hatchback</strong></div><p>From <b>₹104</b>/hr (₹2,499/24h)</p><ArrowIcon /></Link>
          <Link href="/cars" className="category-card"><span>02</span><div><small>Comfort + luggage</small><strong>Sedan</strong></div><p>From <b>₹146</b>/hr (₹3,499/24h)</p><ArrowIcon /></Link>
          <Link href="/cars" className="category-card"><span>03</span><div><small>Families + highways</small><strong>SUV</strong></div><p>From <b>₹117</b>/hr (₹2,799/24h)</p><ArrowIcon /></Link>
        </div>

      </section>

      <section className="section container home-fleet-section">
        <div className="section-head"><div><span className="kicker">CHOOSE YOUR DRIVE</span><h2>Cars for city turns<br />and <em>open highways.</em></h2></div><Link className="text-link" href="/cars">See the full fleet <ArrowIcon /></Link></div>
        <div className="fleet-grid">{cars.slice(0, 6).map((car) => <CarCard car={car} key={car.slug} />)}</div>
      </section>

      <ScrollCarShowcase />

      <section className="service-promises">
        <div className="container service-promises-grid">
          <article><span>↗</span><h3>Doorstep delivery</h3><p>Ask for on-demand delivery and collection at supported Jaipur addresses. Slot and charge are confirmed first.</p></article>
          <article><span>24</span><h3>Human help, 24×7</h3><p>Call or WhatsApp for booking questions, handover coordination and assistance during your trip.</p></article>
          <article><span>✓</span><h3>Clean, checked cars</h3><p>Essential systems, documents and visible condition are reviewed before every confirmed handover.</p></article>
        </div>
      </section>

      <section className="section process-section">
        <div className="container process-grid">
          <div className="process-intro"><span className="kicker">SIMPLE BY DESIGN</span><h2>From tap to ignition<br />in <em>four clear steps.</em></h2><p>No counter confusion. No hidden driver charges. You know what happens next.</p><Link className="button button-dark" href="/self-drive-car-rental-jaipur">See how self-drive works <ArrowIcon /></Link></div>
          <ol className="process-list">
            <li><span>01</span><div><strong>Choose the right car</strong><p>Compare seats, transmission, trip fit and daily plan.</p></div></li>
            <li><span>02</span><div><strong>Share KYC securely</strong><p>Driving licence and ID are verified before pickup.</p></div></li>
            <li><span>03</span><div><strong>Inspect & collect</strong><p>Walk around the car, record condition and receive the keys.</p></div></li>
            <li><span>04</span><div><strong>Drive your own plan</strong><p>Our Jaipur support team stays available throughout.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="section container destination-section">
        <div className="section-head"><div><span className="kicker">FROM JAIPUR, WITH FREEDOM</span><h2>Pick a direction.<br /><em>Keep the day yours.</em></h2></div><p>Practical, locally written drive guides with routes, timing and car recommendations.</p></div>
        <div className="destination-grid"><DestinationCard destination={destinations[0]} featured />{destinations.slice(1, 5).map((item) => <DestinationCard destination={item} key={item.slug} />)}</div>
        <div className="center-action"><Link className="button button-outline" href="/locations">Explore all road trips <ArrowIcon /></Link></div>
      </section>

      <section className="section freedom-section">
        <div className="container freedom-grid">
          <div className="freedom-image"><Image src="/images/locations/nahargarh-fort.webp" alt="Self-drive SUV overlooking Jaipur from Nahargarh" fill sizes="(max-width: 800px) 100vw, 50vw" /><div className="freedom-stamp"><strong>YOU</strong><span>set the pace</span></div></div>
          <div className="freedom-copy"><span className="kicker">WHY SELF-DRIVE</span><h2>Travel without<br /><em>someone else’s clock.</em></h2><p>Leave early. Stay for sunset. Take the scenic turn. A self-drive car gives your Jaipur trip the one thing packaged travel cannot: control.</p><ul><li><ShieldIcon /><span><strong>Verified before every handover</strong><small>Documents, tyres, fluids and essential systems checked.</small></span></li><li><span className="feature-icon">₹</span><span><strong>Plans explained upfront</strong><small>Know the rental, kilometre package and deposit before confirming.</small></span></li><li><span className="feature-icon">↗</span><span><strong>Built for Rajasthan drives</strong><small>Local route guidance and human help whenever you need it.</small></span></li></ul><Link className="text-link orange" href="/about">Why Financer exists <ArrowIcon /></Link></div>

        </div>
      </section>

      <section className="section reviews-section"><div className="container"><div className="reviews-head"><span className="kicker">DRIVER STORIES</span><h2>Jaipur trips, told from<br /><em>the driver’s seat.</em></h2><p>Realistic sample testimonials for the website presentation. Replace them with verified customer reviews before launch.</p></div><div className="review-grid"><blockquote><span className="stars"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></span><p>“The Scorpio N felt solid on the Udaipur highway. Pickup was clear, and the 300 km plan was explained before payment.”</p><footer><strong>Rohit Sharma</strong><span>Scorpio N · Jaipur to Udaipur</span></footer></blockquote><blockquote><span className="stars"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></span><p>“We booked the Thar for Pushkar. Clean car, quick WhatsApp coordination and no confusion about the 24-hour return time.”</p><footer><strong>Ananya & Kunal</strong><span>Thar · Jaipur to Pushkar</span></footer></blockquote><blockquote><span className="stars"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></span><p>“The Swift was easy inside Jaipur and economical for our Amer–Nahargarh day. Handover photos made everything transparent.”</p><footer><strong>Priya Mehta</strong><span>Swift · Jaipur local</span></footer></blockquote></div></div></section>

      <InstagramReels />

      <section className="section faq-home"><div className="container faq-grid"><div><span className="kicker">GOOD TO KNOW</span><h2>Before you<br /><em>take the keys.</em></h2><p>Clear answers about documents, fuel, deposits and travel outside Jaipur.</p><Link className="text-link orange" href="/faq">Read every FAQ <ArrowIcon /></Link></div><div className="faq-list">{faqs.slice(0, 4).map(([question, answer], i) => <details key={question} open={i === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>

      <SiteCta cinematic />
    </main>
  );
}
