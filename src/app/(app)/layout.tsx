import { AppShell } from "@/components/layout/AppShell";
import { RestaurantAuthGuard } from "@/components/auth/RestaurantAuthGuard";

// ============================================================================
// RESTAURANT DASHBOARD LAYOUT
// All pages under /dashboard, /inventory, /analytics, /orders, /settings, /pricing
// are protected by authentication and require restaurant login
// ============================================================================

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <RestaurantAuthGuard>
      <AppShell>{children}</AppShell>
    </RestaurantAuthGuard>
  );
}
