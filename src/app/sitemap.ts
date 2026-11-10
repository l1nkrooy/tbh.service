import type { MetadataRoute } from "next";
import { PACKS } from "@/data/packs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hero-service.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/packs",
    "/characters",
    "/gold",
    "/cube",
    "/boost",
    "/pets",
    "/extra",
    "/reviews",
    "/faq",
    "/terms",
    "/contacts",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const packRoutes = PACKS.map((pack) => ({
    url: `${SITE_URL}/packs/${pack.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...packRoutes];
}
