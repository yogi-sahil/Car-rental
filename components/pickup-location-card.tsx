import Image from "next/image";
import Link from "next/link";
import type { PickupLocation } from "@/lib/data";
import { ArrowIcon, MapIcon } from "./icons";

export function PickupLocationCard({ location, eager = false }: { location: PickupLocation; eager?: boolean }) {
  return (
    <article className="pickup-location-card">
      <Link className="pickup-location-image" href={`/pickup-locations/${location.slug}`}>
        <Image src={location.image} alt={`${location.name} self-drive car pickup area in Jaipur`} fill loading={eager ? "eager" : "lazy"} sizes="(max-width:720px) 100vw, 33vw" />
      </Link>
      <div><span className="kicker"><MapIcon /> {location.zone}</span><h2><Link href={`/pickup-locations/${location.slug}`}>{location.name}</Link></h2><p>{location.summary}</p><small>{location.availability}</small><Link className="text-link orange" href={`/pickup-locations/${location.slug}`}>Read pickup details <ArrowIcon /></Link></div>
    </article>
  );
}
