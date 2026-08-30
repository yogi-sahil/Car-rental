import Image from "next/image";

export function BrandLogo({ light = false, priority = false }: { light?: boolean; priority?: boolean }) {
  return <Image className="brand-logo-image" src={light ? "/brand/financer-logo-light.avif" : "/brand/financer-logo.avif"} alt="Financer Car Rental Jaipur" width={420} height={96} priority={priority} />;
}

