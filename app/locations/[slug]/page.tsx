import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DestinationCard } from "@/components/destination-card";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import { ArrowIcon, CheckIcon, MapIcon } from "@/components/icons";
import { destinations, getDestination, siteUrl } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() { return destinations.map((destination) => ({ slug: destination.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const destination = getDestination((await params).slug);
  if (!destination) return {};
  return { title: `${destination.name} Self Drive Trip from Jaipur`, description: `${destination.summary} Read distance, drive time, route, highlights, parking and self-drive tips.`, alternates: { canonical: `/locations/${destination.slug}` }, openGraph: { images: [destination.image] } };
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const destination = getDestination((await params).slug);
  if (!destination) notFound();
  const related = destinations.filter((item) => item.slug !== destination.slug).slice(0, 3);
  const schema = { "@context": "https://schema.org", "@type": "TouristDestination", name: destination.name, description: destination.summary, image: `${siteUrl}${destination.image}`, touristType: ["Road trip travellers", "Self-drive travellers"], containedInPlace: { "@type": "State", name: "Rajasthan" } };
  return <main><JsonLd data={schema} /><section className="destination-detail-hero"><Image src={destination.image} alt={`${destination.name} road trip from Jaipur`} fill priority sizes="100vw" /><div className="destination-detail-shade" /><div className="container destination-detail-content"><Breadcrumbs items={[{ name: "Road trips", href: "/locations" }, { name: destination.name }]} /><span className="kicker">{destination.eyebrow}</span><h1>Jaipur to<br />{destination.name}</h1><p>{destination.summary}</p><div className="destination-facts"><div><small>Distance</small><strong>{destination.distance}</strong></div><div><small>Drive time</small><strong>{destination.driveTime}</strong></div><div><small>Plan</small><strong>{destination.idealTrip}</strong></div></div></div></section><section className="section container guide-grid"><article><span className="kicker">THE DRIVE</span><h2>A practical self-drive guide.</h2><p className="lead">{destination.intro}</p><div className="route-box"><MapIcon /><div><small>Suggested route</small><strong>{destination.route}</strong></div></div><h3>What to include</h3><div className="highlight-grid">{destination.highlights.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div><h3>Before you leave</h3><ul className="tip-list">{destination.tips.map((tip) => <li key={tip}><CheckIcon /> {tip}</li>)}</ul></article><aside className="guide-aside"><div className="guide-car"><span className="kicker">CAR MATCH</span><h3>{destination.recommendedCar}</h3><p>Recommended for comfort and luggage on this route. Final choice depends on group size and availability.</p><Link className="button button-primary" href={`/booking?destination=${encodeURIComponent(destination.name)}`}>Plan this drive <ArrowIcon /></Link></div><div className="guide-disclaimer"><strong>Useful note</strong><p>Always follow live road signs, local parking rules and destination access restrictions. Financer road-trip content is planning guidance, not a substitute for official advisories.</p></div></aside></section><section className="section related-section"><div className="container"><div className="section-head"><div><span className="kicker">KEEP EXPLORING</span><h2>More drives from Jaipur.</h2></div></div><div className="related-grid">{related.map((item) => <DestinationCard destination={item} key={item.slug} />)}</div></div></section><SiteCta title={`Make ${destination.name} your next drive.`} /></main>;
}
