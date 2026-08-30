"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cars } from "@/lib/data";

const heroCars = cars.slice(0, 6);
const heroCutouts: Record<string, string> = {
  "mahindra-scorpio-n": "/images/cars/cutouts/mahindra-scorpio-n-cutout.webp",
  "mahindra-scorpio": "/images/cars/cutouts/scorpio-classic-cutout.webp",
  "mahindra-thar": "/images/cars/cutouts/thar-cutout.webp",
  "land-rover-defender": "/images/cars/cutouts/defender.webp",
  "maruti-swift": "/images/cars/cutouts/swift-cutout.webp",
  "maruti-fronx": "/images/cars/cutouts/fronx-cutout.webp",
  "maruti-brezza": "/images/cars/cutouts/brezza-cutout.webp",
};



export function HeroCarCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % heroCars.length), 3800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="hero-car-carousel" aria-label="Available self-drive cars">
      <div className="hero-car-orbit" aria-hidden="true" />
      <div className="hero-car-slide active" key={heroCars[active].slug}>
        <Image src={heroCutouts[heroCars[active].slug] ?? heroCars[active].image} alt={`${heroCars[active].name} available from Financer Car Rental Jaipur`} fill loading={active === 0 ? "eager" : "lazy"} fetchPriority={active === 0 ? "high" : "auto"} sizes="(max-width: 900px) 92vw, 48vw" />
        <div className="hero-car-caption"><small>{heroCars[active].category}</small><strong>{heroCars[active].name}</strong><span>₹{heroCars[active].price.toLocaleString("en-IN")} · 24 hours · 300 km</span></div>
      </div>
      <div className="hero-carousel-dots" role="tablist" aria-label="Choose a car">
        {heroCars.map((car, index) => <button className={index === active ? "active" : ""} type="button" onClick={() => setActive(index)} aria-label={`Show ${car.name}`} aria-selected={index === active} role="tab" key={car.slug} />)}
      </div>
      <div className="hero-photo-label"><span className="pulse" /> Available in Jaipur</div>
    </div>
  );
}
