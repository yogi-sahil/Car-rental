import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/lib/data";
import { ArrowIcon } from "./icons";

export function DestinationCard({ destination, featured = false }: { destination: Destination; featured?: boolean }) {
  return (
    <article className={`destination-card${featured ? " destination-featured" : ""}`}>
      <Link className="destination-image" href={`/locations/${destination.slug}`}>
        <Image src={destination.image} alt={`${destination.name} self-drive road trip from Jaipur`} fill sizes={featured ? "(max-width: 720px) 100vw, 55vw" : "(max-width: 720px) 100vw, 33vw"} />
        <span className="distance-pill">{destination.distance}</span>
      </Link>
      <div className="destination-body">
        <span className="kicker">{destination.eyebrow}</span>
        <h3><Link href={`/locations/${destination.slug}`}>{destination.name}</Link></h3>
        <p>{destination.summary}</p>
        <div className="destination-meta"><span>{destination.driveTime}</span><span>{destination.idealTrip}</span><Link href={`/locations/${destination.slug}`} aria-label={`Read ${destination.name} guide`}><ArrowIcon /></Link></div>
      </div>
    </article>
  );
}

