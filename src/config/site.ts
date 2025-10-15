export type IntegrationKey = "stripe" | "paypal" | "square" | "pos" | "analytics";

export const siteConfig = {
  name: "Bountyful",
  shortName: "Bountyful",
  description: "Rescue surplus food, save money, reduce waste",
  logo: {
    light: "/next.svg",
    dark: "/next.svg",
  },
  primaryCta: {
    label: "Browse Experiences",
    href: "/shop",
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
