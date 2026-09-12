import Image from "next/image";
import { ArrowIcon, InstagramIcon } from "./icons";
import { businessDetails } from "@/lib/data";

const instagramReels = [
  {
    id: "DVTTmb7EjKp",
    tag: "DESERT SUNSET",
    title: "Mahindra Thar 4×4 Sambhar Lake Sunset Run",
    image: "/images/locations/sambhar-lake.webp",
    views: "48.2K",
    likes: "3.4K",
  },
  {
    id: "DOVTvXukrYv",
    tag: "ROYAL CONVOY",
    title: "Grand Baraat Convoy Arrival at Fairmont Palace",
    image: "/images/wedding-baraat-convoy.webp",
    views: "85.6K",
    likes: "7.2K",
  },
  {
    id: "DLhv4J5y_Kb",
    tag: "ARAVALLI CLIMB",
    title: "Scorpio N Early Morning Nahargarh Fort Drive",
    image: "/images/locations/nahargarh-fort.webp",
    views: "39.1K",
    likes: "2.9K",
  },
  {
    id: "DLetDmDtp8C",
    tag: "AIRPORT PICKUP",
    title: "Midnight Self-Drive Handover at Jaipur Airport",
    image: "/images/jaipur-road-self-drive-hero.webp",
    views: "52.8K",
    likes: "4.1K",
  },
] as const;

export function InstagramReels() {
  return (
    <section className="section instagram-section" aria-labelledby="instagram-heading">
      <div className="container">
        <div className="instagram-head">
          <div>
            <span className="kicker">ON INSTAGRAM</span>
            <h2 id="instagram-heading">
              Road moments.<br />
              <em>Real reels.</em>
            </h2>
          </div>
          <div>
            <p>Watch actual Jaipur deliveries, palace convoys and road trips on our official handle.</p>
            <a
              className="button button-dark instagram-cta-btn"
              href={businessDetails.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit Financer Instagram profile ${businessDetails.instagramHandle}`}
            >
              <InstagramIcon />
              <span>{businessDetails.instagramHandle}</span>
              <ArrowIcon />
            </a>
          </div>
        </div>

        <div className="instagram-reel-grid">
          {instagramReels.map((reel) => (
            <a
              key={reel.id}
              href={businessDetails.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="instagram-reel-card"
              aria-label={`Watch ${reel.title} on Instagram`}
            >
              {/* Background Cover Image */}
              <div className="reel-media-wrapper">
                <Image
                  src={reel.image}
                  alt={reel.title}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 25vw"
                  className="reel-bg-image"
                />
                <div className="reel-overlay" />
              </div>

              {/* Top Header Pill */}
              <div className="reel-top-bar">
                <span className="reel-tag-pill">{reel.tag}</span>
                <span className="reel-insta-badge" aria-hidden="true">
                  <InstagramIcon />
                </span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="reel-play-button" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              {/* Bottom Card Content */}
              <div className="reel-bottom-info">
                <div className="reel-meta-stats">
                  <span>▶ {reel.views}</span>
                  <span>❤️ {reel.likes}</span>
                </div>
                <h3 className="reel-title">{reel.title}</h3>
                <div className="reel-action-row">
                  <span className="reel-watch-text">Watch on Instagram</span>
                  <span className="reel-arrow-icon" aria-hidden="true">↗</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="instagram-footer-bar">
          <div className="insta-trust-pill">
            <span className="pulse" />
            <span>Join 10,000+ Rajasthan road lovers · Tag <strong>#FinancerCarRental</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}
