import type { ReactNode } from "react";
import Image from "next/image";

export function PageHero({ eyebrow, title, description, image, children }: { eyebrow: string; title: string; description: string; image?: string; children?: ReactNode }) {
  const heroImage = image ?? "/images/jaipur-road-self-drive-hero.jpg";

  return (
    <section className="inner-hero">
      <div className="container inner-hero-grid">
        <div className="inner-hero-content">
          <span className="kicker">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          {children}
        </div>
        <div className="inner-hero-visual">
          <Image src={heroImage} alt="Self-drive SUV moving on a Jaipur road" fill priority sizes="(max-width: 820px) 100vw, 48vw" />
          <div className="inner-hero-badge"><span className="pulse" /> Available across Jaipur</div>
          <div className="inner-hero-caption"><small>DRIVE IT YOURSELF</small><strong>24 hours · 300 km included</strong></div>
        </div>
      </div>
    </section>
  );
}
