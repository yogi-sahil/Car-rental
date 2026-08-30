import type { Metadata } from "next";
import { FleetFilterGrid } from "@/components/fleet-filter-grid";
import { PageHero } from "@/components/page-hero";
import { SiteCta } from "@/components/site-cta";
import { cars } from "@/lib/data";

export const metadata: Metadata = {
  title: "Self Drive Cars in Jaipur – Prices, Fleet & Filters",
  description: "Compare and filter 13 self-drive cars in Jaipur by category, 24-hour price, seats, fuel and transmission. Every listed package includes 300 km.",
  alternates: { canonical: "/cars" },
};

export default function CarsPage() {
  return (
    <main>
      <PageHero
        eyebrow="13 SELF-DRIVE CARS"
        title="Choose the car that fits the road."
        description="Every listed price covers 24 hours with 300 km included. Filter by SUV, Sedan, Hatchback, transmission, fuel, seats and budget."
      />
      <section className="section container">
        <FleetFilterGrid cars={cars} />
        <div className="content-note">
          <strong>Before you book</strong>
          <p>Displayed prices cover a 24-hour rental with 300 km included. Availability, refundable security deposit, fuel and extra-kilometre charges are confirmed before payment.</p>
        </div>
      </section>
      <SiteCta title="Found your car? Let’s hold the dates." />
    </main>
  );
}
