import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { SiteCta } from "@/components/site-cta";
import { faqs } from "@/lib/data";

export const metadata: Metadata = { title: "Self Drive Car Rental Jaipur FAQs", description: "Answers about licence requirements, KYC, fuel, deposits, kilometre limits, outstation travel and support for self-drive rentals in Jaipur.", alternates: { canonical: "/faq" } };

export default function FaqPage() {
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return <main><JsonLd data={schema} /><PageHero eyebrow="SELF-DRIVE FAQs" title="Know the rules before the road." description="Straight answers about documents, deposits, fuel, distance plans and help during your trip." /><section className="section container faq-page-grid"><div className="faq-index"><strong>On this page</strong><a href="#eligibility">Eligibility & KYC</a><a href="#pricing">Pricing & fuel</a><a href="#travel">Outstation travel</a><a href="#support">Support</a></div><div className="faq-page-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0} id={index < 2 ? "eligibility" : index < 4 ? "pricing" : index === 4 ? "travel" : "support"}><summary><span>0{index + 1}</span>{question}<i>+</i></summary><p>{answer}</p></details>)}</div></section><SiteCta title="Still unsure? Talk to our Jaipur team." /></main>;
}

