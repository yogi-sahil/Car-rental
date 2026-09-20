import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { SiteCta } from "@/components/site-cta";
import { ArrowIcon, CheckIcon, UsersIcon } from "@/components/icons";
import { blogPosts, getBlogPost } from "@/lib/blog-data";
import { cars, siteUrl } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  if (!post) return {};

  return {
    title: `${post.title} | Financer Car Rental`,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedDate,
      url: `${siteUrl}/blog/${post.slug}`,
      images: [
        {
          url: post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();

  const matchedCars = post.recommendedCars
    .map((slug) => cars.find((c) => c.slug === slug))
    .filter(Boolean);

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      image: post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`,
      datePublished: post.publishedDate,
      dateModified: post.updatedDate ?? post.publishedDate,
      url: `${siteUrl}/blog/${post.slug}`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${siteUrl}/blog/${post.slug}`,
      },
      author: {
        "@type": "Person",
        name: post.author.name,
        jobTitle: post.author.role,
      },
      publisher: {
        "@type": "Organization",
        name: "Financer Car Rental",
        url: siteUrl,
        logo: `${siteUrl}/brand/financer-mark.avif`,
      },
    },
  ];

  if (post.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    });
  }

  return (
    <main className="blog-article-page">
      <JsonLd data={schemas} />

      <section className="blog-article-hero">
        <div className="container">
          <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: post.title }]} />
          <div className="article-header-wrap">
            <div className="article-badge-row">
              <span className="blog-cat-badge">{post.category}</span>
              <span className="blog-read-time">{post.readTime}</span>
              <span className="article-date">Published {post.publishedDate}</span>
            </div>
            <h1>{post.title}</h1>
            <p className="article-subtitle">{post.subtitle}</p>
            <div className="article-author-card">
              <div className="author-avatar">{post.author.name.charAt(0)}</div>
              <div>
                <strong>{post.author.name}</strong>
                <small>{post.author.role}</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container article-featured-media">
        <div className="article-hero-image">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1100px) 100vw, 1100px"
          />
        </div>
      </section>

      <div className="container article-layout">
        <article className="article-content">
          <div className="key-takeaways-box">
            <span className="kicker">KEY TRIP TAKEAWAYS</span>
            <h3>Quick summary for drivers:</h3>
            <ul>
              {post.keyTakeaways.map((item) => (
                <li key={item}>
                  <CheckIcon /> <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="article-lead">{post.summary}</p>

          {post.sections.map((section, sIndex) => (
            <div className="article-section-block" key={section.heading}>
              <h2>{section.heading}</h2>

              {section.paragraphs.map((p, pIndex) => (
                <p key={pIndex}>{p}</p>
              ))}

              {section.tips && section.tips.length > 0 && (
                <div className="article-tips-card">
                  <strong>Practical Road Steps:</strong>
                  <ul>
                    {section.tips.map((tip, tIndex) => (
                      <li key={tIndex}>
                        <CheckIcon /> <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {section.callout && (
                <div className="article-callout">
                  <strong>💡 {section.callout.title}</strong>
                  <p>{section.callout.text}</p>
                </div>
              )}

              {section.table && (
                <div className="article-table-wrap">
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        {section.table.headers.map((h) => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}

          {matchedCars.length > 0 && (
            <section className="article-recommended-cars">
              <span className="kicker">MATCHED FLEET FOR THIS ROUTE</span>
              <h2>Recommended self-drive cars.</h2>
              <p>Every vehicle listed covers 24 hours with 300 km included, FastTag and 24×7 breakdown support.</p>
              <div className="mini-car-grid">
                {matchedCars.map((car) => car && (
                  <div className="mini-car-card" key={car.slug}>
                    <div className="mini-car-img">
                      <Image src={car.image} alt={car.name} fill sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className="mini-car-info">
                      <h3>{car.name}</h3>
                      <div className="mini-car-meta">
                        <span><UsersIcon /> {car.seats} seats</span>
                        <span>{car.transmission}</span>
                        <span>{car.fuel}</span>
                      </div>
                      <div className="mini-car-price">
                        <strong>₹{car.pricePerHour}/hr</strong>
                        <small>₹{car.price.toLocaleString("en-IN")} / 24 hrs</small>
                      </div>
                      <Link className="button button-primary mini-book-btn" href={`/booking?car=${encodeURIComponent(car.name)}`}>
                        Book this car <ArrowIcon />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {post.faqs.length > 0 && (
            <section className="article-faq-section">
              <span className="kicker">FREQUENTLY ASKED QUESTIONS</span>
              <h2>Common questions about this guide.</h2>
              <div className="faq-list">
                {post.faqs.map(([q, a]) => (
                  <details key={q}>
                    <summary>
                      <span>{q}</span>
                      <span>+</span>
                    </summary>
                    <p>{a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <div className="article-author-bio">
            <div className="bio-avatar">{post.author.name.charAt(0)}</div>
            <div>
              <strong>Written by {post.author.name}</strong>
              <p>
                {post.author.role}. {post.author.name} oversees vehicle handovers, route safety coordination, and fleet readiness for Financer Car Rental across Jaipur and Rajasthan highways.
              </p>
            </div>
          </div>
        </article>

        <aside className="article-sidebar">
          <div className="sidebar-sticky-box">
            <div className="sidebar-booking-card">
              <span className="kicker">FINANCER PROMISE</span>
              <h3>Need a car in Jaipur?</h3>
              <p>Choose from 14 verified cars. Transparent 24-hour packages, 300 km included, doorstep and airport delivery.</p>
              <div className="sidebar-specs">
                <div><span>✓</span> 300 km included / day</div>
                <div><span>✓</span> FastTag equipped</div>
                <div><span>✓</span> 24×7 highway support</div>
                <div><span>✓</span> Direct WhatsApp contact</div>
              </div>
              <Link className="button button-primary full-width" href="/booking">
                Check car availability <ArrowIcon />
              </Link>
              <a
                className="button button-light full-width mt-3"
                href="https://wa.me/919602111420?text=Hi%2C%20I%20am%20reading%20your%20blog%20and%20want%20to%20rent%20a%20car%20in%20Jaipur."
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>

            {relatedPosts.length > 0 && (
              <div className="sidebar-related-card">
                <strong>More Rajasthan Guides</strong>
                <ul>
                  {relatedPosts.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/blog/${r.slug}`}>
                        <span>{r.category}</span>
                        <strong>{r.title}</strong>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      <SiteCta title="Take the keys and explore Rajasthan your way." />
    </main>
  );
}
