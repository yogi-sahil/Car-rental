import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { PickupLocationCard } from "@/components/pickup-location-card";
import { SiteCta } from "@/components/site-cta";
import { ArrowIcon } from "@/components/icons";
import { pickupLocations } from "@/lib/data";

export const metadata: Metadata = { title: "Self Drive Car Pickup Locations in Jaipur", description: "Explore Financer Car Rental pickup and delivery areas at Jaipur Airport, Railway Station, Vaishali Nagar, Mansarovar, Jagatpura and Sindhi Camp.", alternates: { canonical: "/pickup-locations" } };

export default function PickupLocationsPage() {
  return <main><PageHero eyebrow="JAIPUR PICKUP LOCATIONS" title="A handover point close to your plan." description="Read area-specific pickup guidance, nearby neighbourhoods and handover details before requesting your self-drive car."><Link className="button button-primary" href="/booking">Request a car <ArrowIcon /></Link></PageHero><section className="section container pickup-location-grid">{pickupLocations.map((location, index) => <PickupLocationCard location={location} eager={index === 0} key={location.slug} />)}</section><SiteCta title="Choose a Jaipur pickup area and take the keys." /></main>;
}
