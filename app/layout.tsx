import type { Metadata } from "next";
import "flatpickr/dist/flatpickr.min.css";
import "./globals.css";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";
import { MobileActions } from "@/components/mobile-actions";
import { JsonLd } from "@/components/json-ld";
import { businessDetails, siteUrl } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Self Drive Car Rental in Jaipur | Financer Car Rental",
    template: "%s | Financer Car Rental Jaipur",
  },
  description: "Book 14 verified self-drive cars in Jaipur. Every listed daily package covers 24 hours with 300 km included, flexible pickup and 24×7 support.",
  applicationName: "Financer Car Rental Jaipur",
  authors: [{ name: "Financer Car Rental", url: siteUrl }],
  creator: "Financer Car Rental",
  publisher: "Financer Car Rental",
  category: "Travel and car rental",
  referrer: "origin-when-cross-origin",
  keywords: [
    "car rental in Jaipur",
    "self drive car rental Jaipur",
    "self drive cars Jaipur airport",
    "rent a car without driver Jaipur",
    "24 hour car rental Jaipur",
    "self drive SUV Jaipur",
    "Jaipur airport self drive car",
    "Rajasthan road trip car rental",
  ],
  openGraph: {
    title: "Financer Car Rental Jaipur",
    description: "Your Rajasthan. Your keys. Verified self-drive cars from Jaipur.",
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Financer Car Rental Jaipur",
    images: [{ url: "/images/jaipur-road-self-drive-hero.webp", width: 1763, height: 892, alt: "Self-drive SUV on a Jaipur road" }],
  },
  twitter: { card: "summary_large_image", title: "Financer Car Rental Jaipur", description: "14 self-drive cars with 24-hour, 300-km packages in Jaipur.", images: ["/images/jaipur-road-self-drive-hero.webp"] },


  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const websiteSchema = [
    { "@context": "https://schema.org", "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "Financer Car Rental Jaipur", url: siteUrl, inLanguage: "en-IN" },
    { "@context": "https://schema.org", "@type": ["Organization", "LocalBusiness"], "@id": `${siteUrl}/#organization`, name: "Financer Car Rental", url: siteUrl, email: businessDetails.email, telephone: businessDetails.phoneHref, logo: `${siteUrl}/brand/financer-mark.avif`, sameAs: [businessDetails.instagramUrl], founder: { "@type": "Person", name: businessDetails.owner }, address: { "@type": "PostalAddress", streetAddress: "Durgapura", addressLocality: "Jaipur", addressRegion: "Rajasthan", addressCountry: "IN" }, areaServed: { "@type": "City", name: "Jaipur" }, openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" }] },

  ];

  return (
    <html lang="en">
      <body><JsonLd data={websiteSchema} /><Header />{children}<SiteFooter /><MobileActions /></body>
    </html>
  );
}
