import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

export default function NotFound() {
  return <main className="not-found"><span>404</span><h1>This road does not exist.</h1><p>Head back to the Jaipur fleet or choose a verified road-trip guide.</p><div><Link className="button button-primary" href="/cars">View cars <ArrowIcon /></Link><Link className="text-link" href="/locations">Explore road trips</Link></div></main>;
}

