import Link from "next/link";
import { CarIcon, WhatsAppIcon } from "./icons";
import { businessDetails } from "@/lib/data";

export function MobileActions() {
  return <div className="mobile-actions" aria-label="Quick actions"><Link href="/booking"><CarIcon /> Check cars</Link><a className="whatsapp" href={`https://wa.me/${businessDetails.whatsappNumber}?text=Hi%20Financer%2C%20I%20need%20a%20self-drive%20car%20in%20Jaipur`} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp</a></div>;
}
