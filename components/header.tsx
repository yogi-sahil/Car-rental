"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowIcon, MenuIcon, XIcon } from "./icons";
import { SiteSearch } from "./site-search";
import { BrandLogo } from "./brand-logo";

const links = [
  ["Cars", "/cars"],
  ["Pickup locations", "/pickup-locations"],
  ["Road trips", "/locations"],
  ["Self-drive Jaipur", "/self-drive-car-rental-jaipur"],
  ["About", "/about"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.body.classList.add("menu-open");
    window.addEventListener("keydown", close);
    return () => { document.body.classList.remove("menu-open"); window.removeEventListener("keydown", close); };
  }, [open]);

  return (
    <header className="site-header">
      <div className="nav-shell container">
        <Link className="brand" href="/" aria-label="Financer Car Rental home">
          <BrandLogo priority />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => <Link className={pathname === href ? "active" : ""} key={href} href={href}>{label}</Link>)}
        </nav>
        <SiteSearch />
        <Link className="header-book" href="/booking">Book a car <ArrowIcon /></Link>
        <button className="menu-button" type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"}>{open ? <XIcon /> : <MenuIcon />}</button>
      </div>
      {open && (
        <><button className="mobile-menu-backdrop" type="button" onClick={() => setOpen(false)} aria-label="Close navigation" /><nav className="mobile-menu" id="mobile-navigation" aria-label="Mobile navigation">
          <div className="mobile-menu-head"><strong>Explore Financer</strong><small>Cars, pickup points and Rajasthan drives</small></div>
          <SiteSearch mobile onNavigate={() => setOpen(false)} />
          {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link className="mobile-book" href="/booking" onClick={() => setOpen(false)}>Book a self-drive car <ArrowIcon /></Link>
        </nav></>
      )}
    </header>
  );
}
