// Removed feature flags - focusing on core features only

export type NavItem = {
  title: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: NavItem[];
};

const baseNav: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: "home" },
  {
    title: "Listings",
    href: "/inventory",
    icon: "box",
    children: [
      { title: "My Listings", href: "/inventory/listings" },
      { title: "Add Listing", href: "/inventory/new" },
      { title: "Magic Bags", href: "/inventory/magic-bag" },
    ],
  },
  { title: "Orders", href: "/orders", icon: "clipboard-list" },
  { title: "Analytics", href: "/analytics", icon: "chart" },
  { title: "Settings", href: "/settings", icon: "settings" },
];

// Remove feature flag complexity - focus on core features only

export const appNav: NavItem[] = baseNav;
