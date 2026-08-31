import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import { ArrowIcon, CheckIcon, UsersIcon } from "@/components/icons";
import { cars, getCar, siteUrl } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() { return cars.map((car) => ({ slug: car.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const car = getCar((await params).slug);
  if (!car) return {};
  return { title: `${car.name} Self Drive Rental in Jaipur`, description: `${car.summary} Starting at ₹${car.pricePerHour}/hour (₹${car.price.toLocaleString("en-IN")} for 24 hours with ${car.includedKm} km included). View features, trip fit and booking details.`, alternates: { canonical: `/cars/${car.slug}` }, openGraph: { images: [car.image] } };
}

export default async function CarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const car = getCar((await params).slug);
  if (!car) notFound();
  const schema = { "@context": "https://schema.org", "@type": "Product", name: `${car.name} self-drive rental`, image: `${siteUrl}${car.image}`, description: car.summary, brand: { "@type": "Brand", name: car.name.split(" ")[0] }, offers: { "@type": "Offer", priceCurrency: "INR", price: car.price, url: `${siteUrl}/cars/${car.slug}`, availability: "https://schema.org/LimitedAvailability" } };
  return <main><JsonLd data={schema} /><section className="car-detail-hero"><div className="container"><Breadcrumbs items={[{ name: "Cars", href: "/cars" }, { name: car.name }]} /><div className="car-detail-grid"><div className="car-detail-image"><Image src={car.image} alt={`${car.name} self-drive car in Jaipur`} fill priority sizes="(max-width: 850px) 100vw, 55vw" /><span>{car.category}</span></div><div className="car-detail-copy"><span className="kicker">SELF-DRIVE · JAIPUR</span><h1>{car.name}</h1><p>{car.summary}</p><div className="detail-spec-grid"><div><UsersIcon /><span><strong>{car.seats}</strong> seats</span></div><div><span className="detail-icon">G</span><span><strong>{car.transmission}</strong> gearbox</span></div><div><span className="detail-icon">F</span><span><strong>{car.fuel}</strong> fuel</span></div><div><span className="detail-icon">B</span><span><strong>{car.luggage}</strong> bags</span></div></div><div className="detail-price"><div><small>Self-drive rate</small><strong>₹{car.pricePerHour.toLocaleString("en-IN")}<em>/hour</em></strong><span>₹{car.price.toLocaleString("en-IN")} for 24 hours · {car.includedKm} km included · {car.deposit}</span></div><Link className="button button-primary" href={`/booking?car=${encodeURIComponent(car.name)}`}>Check dates <ArrowIcon /></Link></div></div></div></div></section><section className="section container detail-content-grid"><article><span className="kicker">WHY THIS CAR</span><h2>Built around the way you travel.</h2><p>{car.name} is a strong fit for {car.bestFor.join(", ").toLowerCase()}. Final car colour and registration may vary, but the confirmed category and essential features stay clear before pickup.</p><h3>Included features</h3><ul className="feature-list">{car.features.map((feature) => <li key={feature}><CheckIcon /> {feature}</li>)}</ul></article><aside><h3>Best for</h3>{car.bestFor.map((item, index) => <div className="trip-fit" key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}<Link className="text-link orange" href="/locations">Match it with a road trip <ArrowIcon /></Link></aside></section><SiteCta title={`Ready to drive the ${car.name}?`} /></main>;

}
