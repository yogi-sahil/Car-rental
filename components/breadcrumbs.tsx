import Link from "next/link";
import { siteUrl } from "@/lib/data";
import { JsonLd } from "./json-ld";

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  const allItems = [{ name: "Home", href: "/" }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href ? `${siteUrl}${item.href}` : undefined,
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        {allItems.map((item, index) => (
          <span key={item.name}>
            {index > 0 && <i>/</i>}
            {item.href ? <Link href={item.href}>{item.name}</Link> : <strong>{item.name}</strong>}
          </span>
        ))}
      </nav>
    </>
  );
}

