import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SiteCta } from "@/components/site-cta";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { blogPosts } from "@/lib/blog-data";
import { siteUrl } from "@/lib/data";

export const metadata: Metadata = {
  title: "Jaipur Self-Drive Car Rental Blog & Rajasthan Travel Guides",
  description: "Expert guides for renting self-drive cars in Jaipur, Terminal 2 airport pickup, highway routes to Udaipur & Pushkar, cost comparisons, and travel tips.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Financer Car Rental Blog — Jaipur Travel & Road Trip Guides",
    description: "Read local self-drive car rental tips, highway route guides, cost comparisons and airport handover insights for Jaipur.",
    url: `${siteUrl}/blog`,
    images: [{ url: "/images/jaipur-road-self-drive-hero.webp", width: 1763, height: 892, alt: "Rajasthan highway road trip" }],
  },
};

export default function BlogIndexPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Financer Car Rental Blog — Jaipur & Rajasthan Guides",
    url: `${siteUrl}/blog`,
    description: "Expert guides and itineraries for driving in Jaipur, Rajasthan highway travel, and self-drive car rental advice.",
    hasPart: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteUrl}/blog/${post.slug}`,
      datePublished: post.publishedDate,
      author: { "@type": "Person", name: post.author.name },
    })),
  };

  const featuredPost = blogPosts.find((p) => p.featured) ?? blogPosts[0];
  const regularPosts = blogPosts.filter((p) => p.slug !== featuredPost.slug);

  return (
    <main>
      <JsonLd data={collectionSchema} />
      <PageHero
        eyebrow="JAIPUR ROAD TRIP & CAR RENTAL BLOG"
        title="Guides for travellers who love the driver’s seat."
        description="Local road advice, route tips, highway toll guides, and cost breakdowns written by our Jaipur fleet team."
      >
        <Link className="button button-primary" href="/booking">
          Find a rental car <ArrowIcon />
        </Link>
      </PageHero>

      <section className="section container blog-index-section">
        {featuredPost && (
          <article className="featured-blog-card">
            <div className="featured-blog-image">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 55vw"
              />
              <span className="featured-tag">FEATURED GUIDE</span>
            </div>
            <div className="featured-blog-body">
              <div className="blog-meta-row">
                <span className="blog-cat-badge">{featuredPost.category}</span>
                <span className="blog-read-time">{featuredPost.readTime}</span>
              </div>
              <h2>
                <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
              </h2>
              <p>{featuredPost.summary}</p>
              <ul className="featured-highlights">
                {featuredPost.keyTakeaways.slice(0, 2).map((item) => (
                  <li key={item}>
                    <CheckIcon /> {item}
                  </li>
                ))}
              </ul>
              <div className="featured-action-row">
                <div className="blog-author-info">
                  <strong>{featuredPost.author.name}</strong>
                  <small>{featuredPost.publishedDate}</small>
                </div>
                <Link className="text-link orange" href={`/blog/${featuredPost.slug}`}>
                  Read complete guide <ArrowIcon />
                </Link>
              </div>
            </div>
          </article>
        )}

        <div className="section-head mt-8">
          <div>
            <span className="kicker">MORE ARTICLES & GUIDES</span>
            <h2>Latest Rajasthan driving guides.</h2>
          </div>
        </div>

        <div className="blog-grid">
          {regularPosts.map((post) => (
            <article className="blog-card" key={post.slug}>
              <div className="blog-card-image">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="blog-cat-pill">{post.category}</span>
              </div>
              <div className="blog-card-body">
                <div className="blog-meta-row">
                  <small>{post.publishedDate}</small>
                  <span>{post.readTime}</span>
                </div>
                <h3>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.summary}</p>
                <div className="blog-card-footer">
                  <div className="blog-author-mini">By {post.author.name}</div>
                  <Link className="text-link orange" href={`/blog/${post.slug}`}>
                    Read <ArrowIcon />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteCta title="Have a custom Rajasthan road trip plan?" />
    </main>
  );
}
