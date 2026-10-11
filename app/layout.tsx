import type { Metadata } from "next";
import "flatpickr/dist/flatpickr.min.css";
import "./globals.css";
import Script from "next/script";
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
    "car rental Jaipur railway station",
    "car rental Mansarovar Jaipur",
    "car rental Vaishali Nagar Jaipur",
    "car rental Malviya Nagar Jaipur",
    "car rental Jagatpura Jaipur",
    "car rental Raja Park Jaipur",
    "luxury wedding car rental Jaipur",
    "Mahindra Thar on rent Jaipur",
    "Defender on rent Jaipur",
    "Scorpio N self drive Jaipur",
    "monthly car rental Jaipur",
    "corporate car rental Sitapura",
    "luxury car rental Kukas Jaipur",
    "CNG car rental Jaipur",
    "cheap car hire Jaipur",
    "Delhi Mumbai Expressway self drive Jaipur",
    "Rajasthan road trip car rental",
  ],
  openGraph: {
    title: "Financer Car Rental Jaipur | Self Drive Cars Without Driver",
    description: "Book verified self-drive cars in Jaipur from ₹104/hr. Airport & railway station handovers, Thar 4x4, Defender, Scorpio N, Swift & Creta with 300 km daily plans.",
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
  verification: {
    google: "YFF5-Nq5r3gtoelDR6O-19eY0Np8DE_GdCa8vu9Lhts",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const websiteSchema = [
    { "@context": "https://schema.org", "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "Financer Car Rental Jaipur", url: siteUrl, inLanguage: "en-IN" },
    {
      "@context": "https://schema.org",
      "@type": ["AutoRental", "Organization", "LocalBusiness"],
      "@id": `${siteUrl}/#organization`,
      name: "Financer Car Rental",
      url: siteUrl,
      email: businessDetails.email,
      telephone: businessDetails.phoneHref,
      priceRange: "₹₹",
      logo: `${siteUrl}/brand/financer-mark.avif`,
      sameAs: [businessDetails.instagramUrl],
      founder: { "@type": "Person", name: businessDetails.owner },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Durgapura",
        addressLocality: "Jaipur",
        addressRegion: "Rajasthan",
        postalCode: "302018",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 26.8517,
        longitude: 75.7899,
      },
      areaServed: [
        "Jaipur",
        "Mansarovar",
        "Vaishali Nagar",
        "Malviya Nagar",
        "Jagatpura",
        "C-Scheme",
        "Raja Park",
        "Durgapura",
        "Jaipur Airport (JAI)",
        "Jaipur Junction Railway Station",
        "Kukas",
        "Sitapura",
      ],
      openingHoursSpecification: [{
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      }],
    },
  ];

  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WVEDL5QY6D"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WVEDL5QY6D');
          `}
        </Script>
      </head>
      <body><JsonLd data={websiteSchema} /><Header />{children}<SiteFooter /><MobileActions /></body>
    </html>
  );
}
