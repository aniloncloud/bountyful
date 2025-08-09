export type IntegrationKey = "stripe" | "paypal" | "square" | "pos" | "analytics";

export const siteConfig = {
  name: "Good2Go Restaurants",
  description: "Operational hub for surplus listings, orders, and insights",
  logo: {
    light: "/next.svg",
    dark: "/next.svg",
  },
  primaryCta: {
    label: "Get started",
    href: "/signup",
  },
  secondaryCta: {
    label: "Learn more",
    href: "#features",
  },
  social: {
    twitter: "#",
    linkedin: "#",
    instagram: "#",
  },
  integrations: {
    available: ["stripe", "paypal", "square", "pos", "analytics"] as IntegrationKey[],
  },
} as const;

export type SiteConfig = typeof siteConfig;
