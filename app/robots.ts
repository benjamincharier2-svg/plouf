import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/confirmation"],
    },
    sitemap: "https://ploufpiscines.fr/sitemap.xml",
  };
}
