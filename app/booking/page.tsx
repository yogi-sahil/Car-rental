import type { Metadata } from "next";
import { BookingDetailsForm } from "@/components/booking-details-form";
import { businessDetails } from "@/lib/data";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = { title: "Book a Self Drive Car in Jaipur", description: "Request a verified self-drive car in Jaipur. Select pickup hub, dates, car and destination. No payment is taken until availability is confirmed.", alternates: { canonical: "/booking" } };

export default function BookingPage() {
  return <main className="booking-page"><section className="booking-page-head"><div className="container"><Breadcrumbs items={[{ name: "Book" }]} /><span className="kicker">BOOK YOUR DRIVE</span><h1>A few details.<br />Then the keys.</h1><p>This is an availability request—not an instant charge. We confirm the car, exact plan and KYC details with you first.</p></div></section><section className="container booking-layout"><BookingDetailsForm /><aside className="booking-assurance"><strong>What happens next</strong><ol><li><span>1</span>Availability check</li><li><span>2</span>KYC & licence review</li><li><span>3</span>Price and deposit confirmation</li><li><span>4</span>Pickup slot locked</li></ol><div><small>Need help now?</small><a href={`tel:${businessDetails.phoneHref}`}>{businessDetails.phone}</a><span>Open 24 hours · 7 days</span></div></aside></section></main>;
}
