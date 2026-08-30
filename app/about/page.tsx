import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { SiteCta } from "@/components/site-cta";
import { businessDetails } from "@/lib/data";

export const metadata: Metadata = { title: "About Financer Car Rental Jaipur", description: "Financer Car Rental is a Jaipur self-drive rental business owned by Sachin Jaat, offering clear 24-hour car plans and support across Jaipur.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return <main><PageHero eyebrow="ABOUT FINANCER" title="Built for travellers who prefer the driver’s seat." description={`Financer Car Rental is a Jaipur self-drive business owned by ${businessDetails.owner}, focused on clear rentals and useful local road-trip guidance.`} /><section className="section container story-grid"><div className="story-image"><Image src="/images/locations/sambhar-lake.webp" alt="Self-drive road trip at Sambhar Lake near Jaipur" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><article><span className="kicker">OUR POINT OF VIEW</span><h2>Car rental should explain itself.</h2><p className="lead">Too many rental experiences feel uncertain until the last minute. Financer is built around the opposite idea: show the car clearly, explain the plan, verify responsibly and make help easy to reach.</p><p>Based in Durgapura and serving Jaipur, we help customers choose self-drive cars for city travel and Rajasthan road trips. Phone and WhatsApp support are available 24×7.</p></article></section><section className="section values-section"><div className="container"><span className="kicker">WHAT GUIDES US</span><div className="value-grid"><div><span>01</span><h3>Clarity over cleverness</h3><p>Important rental terms should be visible before a customer commits.</p></div><div><span>02</span><h3>Local knowledge matters</h3><p>A useful Jaipur route tip can be worth more than another promotional banner.</p></div><div><span>03</span><h3>Handover is the product</h3><p>Cleanliness, condition records and calm explanation build real trust.</p></div></div></div></section><SiteCta /></main>;
}

