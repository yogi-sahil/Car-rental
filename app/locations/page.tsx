import type { Metadata } from "next";
import { DestinationCard } from "@/components/destination-card";
import { PageHero } from "@/components/page-hero";
import { SiteCta } from "@/components/site-cta";
import { destinations } from "@/lib/data";

export const metadata: Metadata = {
  title: "Road Trips from Jaipur by Self Drive Car",
  description: "Explore detailed self-drive guides from Jaipur to Amer, Nahargarh, Pushkar, Ajmer, Sambhar Lake and Ranthambore with distance, timing and route tips.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return <main><PageHero eyebrow="JAIPUR ROAD-TRIP LIBRARY" title="Every good drive needs a useful plan." description="Locally written destination guides with realistic timing, route context, parking advice and the right car for the trip." /><section className="section container"><div className="destination-list-grid">{destinations.map((item, index) => <DestinationCard destination={item} featured={index === 0} key={item.slug} />)}</div></section><section className="route-note"><div className="container"><strong>Drive responsibly</strong><p>Distances and travel times are approximate. Road, weather, parking and local-access conditions can change. Check live navigation and official destination guidance before leaving.</p></div></section><SiteCta title="Choose a destination. We’ll help with the car." /></main>;
}
