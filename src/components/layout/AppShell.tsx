"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { appNav } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black">
      <aside className="fixed inset-y-0 z-20 hidden w-64 border-r bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/70 md:block">
        <div className="flex h-16 items-center gap-2 border-b px-4 dark:border-neutral-800">
          <div className="h-6 w-6 rounded bg-black dark:bg-white" />
          <span className="text-sm font-semibold">{siteConfig.name}</span>
        </div>
        <nav className="p-3">
          {appNav.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <div key={item.href} className="mb-1">
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900",
                    active && "bg-neutral-100 dark:bg-neutral-900"
                  )}
                >
                  {item.title}
                </Link>
                {item.children && (
                  <div className="ml-2 mt-1 space-y-1">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={cn(
                          "block rounded-md px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900",
                          pathname === c.href && "bg-neutral-100 dark:bg-neutral-900"
                        )}
                      >
                        {c.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
      <div className="md:pl-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white/80 px-4 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/70">
          <div className="flex items-center gap-2 md:hidden">
            <div className="h-6 w-6 rounded bg-black dark:bg-white" />
            <span className="text-sm font-semibold">{siteConfig.name}</span>
          </div>
          <div className="flex-1 px-2">
            <input className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm shadow-sm dark:border-neutral-700" placeholder="Search" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">Feedback</Button>
            <Button size="sm">New Listing</Button>
          </div>
        </header>
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
