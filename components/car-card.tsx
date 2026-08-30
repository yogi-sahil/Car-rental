import Image from "next/image";
import Link from "next/link";
import { businessDetails, type Car } from "@/lib/data";
import { ArrowIcon, UsersIcon } from "./icons";

export function CarCard({ car, eager = false }: { car: Car; eager?: boolean }) {
  return (
    <article className="fleet-card">
      <Link className="fleet-image" href={`/cars/${car.slug}`} aria-label={`View ${car.name}`}>
        <Image src={car.image} alt={`${car.name} self-drive rental in Jaipur`} fill loading={eager ? "eager" : "lazy"} sizes="(max-width: 720px) 100vw, 33vw" />
        <span>{car.category}</span>
      </Link>
      <div className="fleet-body">
        <h3><Link href={`/cars/${car.slug}`}>{car.name}</Link></h3>
        <p>{car.summary}</p>
        <div className="fleet-specs">
          <span><UsersIcon /> {car.seats} seats</span>
          <span>{car.transmission}</span>
          <span>{car.fuel}</span>
        </div>
        <div className="fleet-plan"><strong>{car.includedHours} hours</strong><span>{car.includedKm} km included</span></div>
        <div className="fleet-price">
          <div><small>Self-drive package</small><strong>₹{car.price.toLocaleString("en-IN")}<em>/24 hours</em></strong></div>
          <Link href={`/cars/${car.slug}`}>View car <ArrowIcon /></Link>
        </div>
        <div className="fleet-actions">
          <a href={`tel:${businessDetails.phoneHref}`}>Call to book</a>
          <a href={`https://wa.me/${businessDetails.whatsappNumber}?text=${encodeURIComponent(`Hi, I want to check ${car.name} availability in Jaipur.`)}`} target="_blank" rel="noreferrer">Book on WhatsApp</a>
        </div>
      </div>
    </article>
  );
}
