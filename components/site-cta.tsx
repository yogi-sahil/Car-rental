import Link from "next/link";
import Image from "next/image";
import { ArrowIcon, WhatsAppIcon } from "./icons";
import { businessDetails } from "@/lib/data";

export function SiteCta({ title = "Your Jaipur road trip starts with the keys.", cinematic = false }: { title?: string; cinematic?: boolean }) {
  return (
    <section className={`site-cta${cinematic ? " site-cta-cinematic" : ""}`}>
      {cinematic && <div className="site-cta-car" aria-hidden="true"><Image src="/images/cars/maruti-fronx.webp" alt="" fill loading="lazy" sizes="(max-width: 820px) 65vw, 360px" /></div>}

      <div className="container site-cta-inner">
        <div><span className="kicker">READY WHEN YOU ARE</span><h2>{title}</h2><p>Choose a car, complete KYC and drive Jaipur on your schedule.</p></div>
        <div><Link className="button button-light" href="/booking">Check availability <ArrowIcon /></Link><a className="cta-whatsapp" href={`https://wa.me/${businessDetails.whatsappNumber}`} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp us</a></div>
      </div>
    </section>
  );
}
