import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, CheckIcon } from "./icons";

export function ScrollCarShowcase() {
  return <section className="drive-showcase"><div className="container drive-showcase-grid"><div className="drive-showcase-copy"><span className="kicker">PRIORITY FLEET</span><h2>Big road presence.<br /><em>Zero driver.</em></h2><p>Book Jaipur’s most-requested Scorpio, Thar, Swift, Fronx and Brezza—with one clear package for the day.</p><ul><li><CheckIcon /> 24-hour self-drive rental</li><li><CheckIcon /> 300 km included</li><li><CheckIcon /> Jaipur pickup coordination</li></ul><Link className="button button-light" href="/cars">Explore all 14 cars <ArrowIcon /></Link></div><div className="drive-stage" aria-label="Mahindra Scorpio N priority self-drive car"><div className="drive-sun" /><div className="drive-road"><span /><span /><span /></div><div className="drive-car"><Image src="/images/cars/cutouts/mahindra-scorpio-n-cutout.webp" alt="Mahindra Scorpio N self-drive rental in Jaipur" fill loading="lazy" sizes="(max-width: 820px) 94vw, 55vw" /></div><div className="drive-shadow" /><div className="drive-label"><small>FROM</small><strong>₹5,999</strong><span>24 hrs · 300 km</span></div></div></div></section>;
}


