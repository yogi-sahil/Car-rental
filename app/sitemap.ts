import type { MetadataRoute } from "next";
import { cars, destinations, pickupLocations, siteUrl } from "@/lib/data";
import { blogPosts } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-12");
  const staticPages = [
    "",
    "/cars",
    "/wedding-bulk-booking",
    "/pickup-locations",
    "/locations",
    "/self-drive-car-rental-jaipur",
    "/blog",
    "/booking",
    "/about",
    "/faq",
    "/contact",
    "/terms",
  ];

  return [
    ...staticPages.map((path, index) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      changeFrequency: index < 4 ? ("weekly" as const) : ("monthly" as const),
      priority: index === 0 ? 1 : index < 5 ? 0.9 : 0.7,
    })),
    ...cars.map((car) => ({
      url: `${siteUrl}/cars/${car.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: [`${siteUrl}${car.image}`],
    })),
    ...destinations.map((destination) => ({
      url: `${siteUrl}/locations/${destination.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [`${siteUrl}${destination.image}`],
    })),
    ...pickupLocations.map((location) => ({
      url: `${siteUrl}/pickup-locations/${location.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [`${siteUrl}${location.image}`],
    })),
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedDate),
      changeFrequency: "weekly" as const,
      priority: 0.85,
      images: [post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`],
    })),
  ];
}
