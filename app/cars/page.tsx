import type { Metadata } from "next";
import { FleetFilterGrid } from "@/components/fleet-filter-grid";
import { PageHero } from "@/components/page-hero";
import { SiteCta } from "@/components/site-cta";
import { cars } from "@/lib/data";

export const metadata: Metadata = {
  title: "Self Drive Cars in Jaipur – Prices, Fleet & Filters",
  description: "Compare and filter 14 self-drive cars in Jaipur by category, 24-hour price, seats, fuel and transmission. Every listed package includes 300 km.",
  alternates: { canonical: "/cars" },
};

export default function CarsPage() {
  return (
    <main>
      <PageHero
        eyebrow="14 SELF-DRIVE CARS"
        title="Choose the car that fits the road."
        description="Starting from ₹104/hour. Every listed car comes with transparent 24-hour packages with 300 km included. Filter by body type, transmission, fuel and budget."
      />

      <section className="section container">
        <FleetFilterGrid cars={cars} />
        <div className="content-note">
          <strong>Before you book</strong>
          <p>Displayed rates show starting hourly pricing alongside clear 24-hour packages with 300 km included. Availability, refundable security deposit, fuel and extra-kilometre charges are confirmed before payment.</p>
        </div>
      </section>

      <SiteCta title="Found your car? Let’s hold the dates." />
    </main>
  );
}
