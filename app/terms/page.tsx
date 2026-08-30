import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { JsonLd } from "@/components/json-ld";
import { siteUrl } from "@/lib/data";

export const metadata: Metadata = {
  title: "Self Drive Car Rental Terms and Conditions",
  description: "Read Financer Car Rental Jaipur terms covering eligibility, KYC, pricing, deposits, permitted use, cancellations, accidents and customer responsibilities.",
  alternates: { canonical: "/terms" },
  openGraph: { url: "/terms", title: "Rental Terms | Financer Car Rental Jaipur", description: "Important self-drive rental terms to review before requesting or collecting a car in Jaipur." },
};

const sections = [
  { id: "agreement", title: "1. Scope and agreement", body: <>These terms explain the general conditions for requesting and using a Financer self-drive vehicle. A website request does not guarantee a car. Your confirmed quotation, vehicle checklist and signed rental agreement contain the final commercial terms and will control if they differ from this page.</> },
  { id: "eligibility", title: "2. Eligibility and KYC", body: <>The primary driver must meet the minimum age and driving-experience requirements shared for the selected vehicle. A valid driving licence, government photo ID, address proof and any additional verification requested for risk review must be provided. Financer may decline a booking when documents cannot be verified.</> },
  { id: "booking", title: "3. Booking and availability", body: <>Displayed cars, colours and prices are indicative until the team confirms the exact vehicle, dates, pickup location, kilometre plan and deposit. A booking is locked only after required verification and payment are completed and a written confirmation is issued.</> },
  { id: "pricing", title: "4. Rental charges and deposit", body: <>The confirmed quote will state the rental period, included kilometres, excess-kilometre rate, delivery charge, taxes and refundable security deposit where applicable. Extensions require approval before the scheduled return time and may be charged at a different rate.</> },
  { id: "handover", title: "5. Pickup, inspection and return", body: <>The renter should inspect the vehicle, fuel level, documents, accessories and visible condition at handover. Photos or a checklist may form part of the condition record. The car must be returned at the confirmed location and time in the condition and fuel level described in the rental agreement.</> },
  { id: "use", title: "6. Permitted and prohibited use", body: <>Only approved drivers may operate the vehicle. The car must be used on lawful public roads and in accordance with traffic rules. Racing, towing, commercial passenger use, unauthorised off-road driving, driving under the influence, sub-renting and use for unlawful activity are prohibited.</> },
  { id: "expenses", title: "7. Fuel, tolls, parking and fines", body: <>Unless the confirmed plan says otherwise, fuel is handled on a same-to-same basis. Tolls, parking, interstate permits, traffic penalties and charges caused during the rental are the renter’s responsibility. FASTag usage may be reconciled after return.</> },
  { id: "incident", title: "8. Breakdown, damage or accident", body: <>Contact Financer immediately and follow the support instructions. Do not abandon, repair or settle an accident involving the vehicle without approval except where urgent action is required for personal safety. Police reporting, insurer documentation and renter cooperation may be required. Liability depends on the signed agreement, evidence and applicable insurance terms.</> },
  { id: "cancellation", title: "9. Cancellation and refunds", body: <>Cancellation, date-change, late pickup, no-show and early-return rules depend on the confirmed plan. Any eligible refund is processed after applicable deductions using the stated payment method and timeline. These details must be reviewed before payment.</> },
  { id: "privacy", title: "10. Personal information", body: <>Booking details may be stored in Financer’s private lead-management Google Sheet and used to coordinate the rental, provide support, prevent fraud and meet legal or insurance obligations. Basic enquiry data includes contact details, trip dates, selected car, pickup point and referral source. Do not send driving-licence files or other sensitive documents through the website form. Access, retention and sharing should be limited to legitimate booking, safety and compliance needs.</> },
  { id: "liability", title: "11. Responsibility and limitations", body: <>The renter remains responsible for safe, lawful operation and timely reporting of problems. Financer is not responsible for delays or losses caused by traffic, weather, road closures, government restrictions or events outside reasonable control, subject always to rights that cannot legally be excluded.</> },
  { id: "law", title: "12. Governing law and contact", body: <>These terms are intended to be governed by applicable Indian law, with disputes subject to the competent courts in Jaipur, Rajasthan, unless mandatory law requires otherwise. Questions can be sent through the <Link href="/contact">contact page</Link> before booking.</> },
];

export default function TermsPage() {
  const schema = { "@context": "https://schema.org", "@type": "WebPage", name: "Financer Car Rental Terms and Conditions", url: `${siteUrl}/terms`, dateModified: "2026-08-11", description: "General terms for self-drive car rental requests and vehicle use in Jaipur." };

  return <main><JsonLd data={schema} /><PageHero eyebrow="RENTAL TERMS" title="Clear terms before you take the keys." description="The practical rules for booking, driving and returning a Financer self-drive car in Jaipur." /><section className="section container legal-layout"><aside className="legal-index"><strong>On this page</strong>{sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.title.replace(/^\d+\. /, "")}</a>)}</aside><article className="legal-copy"><div className="legal-notice"><strong>Effective 11 August 2026</strong><p>This is a website-ready general terms template. Final pricing, insurance, damage liability, cancellation rules and local compliance details must be reviewed by the business and a qualified legal professional before public launch.</p></div>{sections.map((section) => <section id={section.id} key={section.id}><h2>{section.title}</h2><p>{section.body}</p></section>)}</article></section></main>;
}
