import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Financer Car Rental Jaipur",
    short_name: "Financer",
    description: "Self-drive car rentals with 24-hour, 300-km packages across Jaipur.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffdf9",
    theme_color: "#17221f",
    categories: ["travel", "automotive"],
    icons: [{ src: "/brand/financer-mark.avif", sizes: "500x500", type: "image/avif", purpose: "any" }],

  };
}
