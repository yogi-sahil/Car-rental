import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import { ArrowIcon, CheckIcon, MapIcon } from "@/components/icons";
import { getPickupLocation, pickupLocations, siteUrl } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() { return pickupLocations.map((location) => ({ slug: location.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const location = getPickupLocation((await params).slug);
  if (!location) return {};
  return { title: `Self Drive Car Rental at ${location.name}`, description: `${location.summary} View pickup timing, nearby areas, KYC and booking guidance.`, alternates: { canonical: `/pickup-locations/${location.slug}` }, openGraph: { images: [location.image] } };
}

export default async function PickupLocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const location = getPickupLocation((await params).slug);
  if (!location) notFound();
  const related = pickupLocations.filter((item) => item.slug !== location.slug).slice(0, 3);
  const schema = { "@context": "https://schema.org", "@type": "Service", name: `Self-drive car rental at ${location.name}`, provider: { "@type": "AutoRental", name: "Financer Car Rental", url: siteUrl }, areaServed: { "@type": "Place", name: location.name }, description: location.summary, url: `${siteUrl}/pickup-locations/${location.slug}` };
  return <main><JsonLd data={schema} /><section className="pickup-detail-hero"><Image src={location.image} alt={`${location.name} car rental pickup in Jaipur`} fill priority sizes="100vw" /><div className="destination-detail-shade" /><div className="container pickup-detail-content"><Breadcrumbs items={[{ name: "Pickup locations", href: "/pickup-locations" }, { name: location.name }]} /><span className="kicker">{location.zone}</span><h1>Self-drive cars at<br />{location.name}</h1><p>{location.summary}</p><div className="pickup-availability"><span className="pulse" /><strong>{location.availability}</strong></div></div></section><section className="section container guide-grid"><article><span className="kicker">PICKUP GUIDE</span><h2>Know the handover before you arrive.</h2><p className="lead">{location.intro}</p><div className="route-box"><MapIcon /><div><small>Handover approach</small><strong>{location.handover}</strong></div></div><h3>Best suited for</h3><div className="highlight-grid">{location.bestFor.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div><h3>Nearby areas served</h3><ul className="tip-list">{location.nearby.map((item) => <li key={item}><CheckIcon /> {item}</li>)}</ul></article><aside className="guide-aside"><div className="guide-car"><span className="kicker">ONE CLEAR PACKAGE</span><h3>24 hours · 300 km</h3><p>Choose from 13 cars starting at ₹2,499. Final availability, deposit and extra-kilometre charge are confirmed first.</p><Link className="button button-primary" href={`/booking?pickup=${encodeURIComponent(location.name)}`}>Check this location <ArrowIcon /></Link></div><div className="guide-disclaimer"><strong>Before you travel</strong><p>The exact handover point is shared only after availability and KYC are confirmed. Do not arrive without a confirmed slot.</p></div></aside></section><section className="section related-section"><div className="container"><div className="section-head"><div><span className="kicker">MORE JAIPUR AREAS</span><h2>Other pickup locations.</h2></div></div><div className="pickup-location-grid compact">{related.map((item) => <div className="pickup-related" key={item.slug}><span>{item.zone}</span><h3>{item.name}</h3><Link className="text-link orange" href={`/pickup-locations/${item.slug}`}>View details <ArrowIcon /></Link></div>)}</div></div></section><SiteCta title={`Pick up your car near ${location.name}.`} /></main>;
}
