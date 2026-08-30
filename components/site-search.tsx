"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { cars, destinations, pickupLocations } from "@/lib/data";
import { ArrowIcon, SearchIcon, XIcon } from "./icons";

const pages = [
  { name: "Browse all cars", detail: "Fleet", href: "/cars" },
  { name: "Book a self-drive car", detail: "Booking", href: "/booking" },
  { name: "Rental terms and conditions", detail: "Eligibility, deposits, permitted use and cancellations", href: "/terms" },
  { name: "Self-drive in Jaipur", detail: "How it works", href: "/self-drive-car-rental-jaipur" },
  ...cars.map((car) => ({ name: car.name, detail: `${car.category} · ₹${car.price.toLocaleString("en-IN")}/24 hrs · 300 km`, href: `/cars/${car.slug}` })),
  ...pickupLocations.map((location) => ({ name: location.name, detail: `Pickup · ${location.zone}`, href: `/pickup-locations/${location.slug}` })),
  ...destinations.map((destination) => ({ name: destination.name, detail: `Road trip · ${destination.distance}`, href: `/locations/${destination.slug}` })),
];

export function SiteSearch({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return (normalized ? pages.filter((item) => `${item.name} ${item.detail}`.toLowerCase().includes(normalized)) : pages.slice(0, 7)).slice(0, 8);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  function closeSearch() { setOpen(false); setQuery(""); onNavigate?.(); }

  return <>
    <button className={mobile ? "mobile-search-trigger" : "search-trigger"} type="button" onClick={() => setOpen(true)} aria-label="Search cars, pickup locations and road trips"><SearchIcon /><span>Search</span></button>
    {open && <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Site search" onMouseDown={(event) => event.target === event.currentTarget && closeSearch()}><div className="search-panel"><div className="search-panel-head"><div><span className="kicker">FIND IT FAST</span><h2>Where do you want to go?</h2></div><button type="button" onClick={closeSearch} aria-label="Close search"><XIcon /></button></div><label className="search-input"><SearchIcon /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search cars, Jaipur areas or road trips" /><span>{results.length} results</span></label><div className="search-results">{results.length ? results.map((item) => <Link href={item.href} onClick={closeSearch} key={item.href}><span><strong>{item.name}</strong><small>{item.detail}</small></span><ArrowIcon /></Link>) : <div className="search-empty"><strong>No exact match</strong><p>Try “Airport”, “Scorpio”, “Pushkar” or browse all cars.</p><Link className="button button-primary" href="/cars" onClick={closeSearch}>See all cars <ArrowIcon /></Link></div>}</div></div></div>}
  </>;
}
