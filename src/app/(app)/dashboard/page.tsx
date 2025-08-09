import { StatCard } from "@/components/blocks/StatCard";
import { LineTrend, BarMini } from "@/components/charts/Trend";
import Link from "next/link";

const spark = [
  { x: "M", y: 5 },
  { x: "T", y: 7 },
  { x: "W", y: 12 },
  { x: "T", y: 9 },
  { x: "F", y: 13 },
  { x: "S", y: 11 },
  { x: "S", y: 14 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border p-4 text-sm dark:border-neutral-800">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-neutral-600 dark:text-neutral-300">Meals Rescued</div>
            <div className="text-xl font-semibold">15,842</div>
          </div>
          <div>
            <div className="text-xs text-neutral-600 dark:text-neutral-300">CO₂e Saved</div>
            <div className="text-xl font-semibold">21.3t</div>
          </div>
          <div>
            <div className="text-xs text-neutral-600 dark:text-neutral-300">Bags This Week</div>
            <div className="text-xl font-semibold">312</div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Sales (7d)" value="$4,920" data={spark} />
        <StatCard title="Awaiting Pickup" value="12" data={spark} />
        <StatCard title="Low Inventory" value="3" data={spark} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border p-5 dark:border-neutral-800">
          <h3 className="text-base font-semibold">Week Overview</h3>
          <LineTrend data={[{ x: "Mon", a: 420, b: 23 }, { x: "Tue", a: 380, b: 18 }, { x: "Wed", a: 600, b: 33 }, { x: "Thu", a: 520, b: 28 }, { x: "Fri", a: 950, b: 51 }, { x: "Sat", a: 810, b: 45 }, { x: "Sun", a: 700, b: 41 }]} />
        </div>
        <div className="rounded-xl border p-5 dark:border-neutral-800">
          <h3 className="text-base font-semibold">Top Categories</h3>
          <BarMini data={[{ x: "Bags", v: 52 }, { x: "Bundles", v: 31 }, { x: "Meals", v: 19 }, { x: "Sides", v: 12 }]} />
        </div>
        <div className="rounded-xl border p-5 dark:border-neutral-800">
          <h3 className="text-base font-semibold">Announcements</h3>
          <ul className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
            <li>Stripe payouts scheduled for Friday</li>
            <li>New analytics module shipped</li>
            <li>Venue hours updated for long weekend</li>
          </ul>
        </div>
        <div className="rounded-xl border p-5 dark:border-neutral-800">
          <h3 className="text-base font-semibold">Quick Actions</h3>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <li><Link className="rounded-lg border p-3 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900" href="/inventory/new">Add Listing</Link></li>
            <li><Link className="rounded-lg border p-3 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900" href="/inventory/magic-bag">Create Magic Bag</Link></li>
            <li><Link className="rounded-lg border p-3 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900" href="/orders">View Orders</Link></li>
            <li><Link className="rounded-lg border p-3 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900" href="/analytics">Analytics</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
