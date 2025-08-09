export default function OrdersPage() {
  const statuses = ["reserved", "arrived", "redeemed", "expired", "donated"] as const;
  const now = Date.now();
  const deals = [
    { title: "Evening Rush - 30%", endsAt: now + 25 * 60 * 1000 },
    { title: "Lunch Boost - 20%", endsAt: now + 55 * 60 * 1000 },
  ];
  const acceptedParty = [
    { label: "Party Pickup #P-2041", pickupAt: now + 35 * 60 * 1000 },
    { label: "Party Pickup #P-2042", pickupAt: now + 75 * 60 * 1000 },
  ];
  const color: Record<typeof statuses[number], string> = {
    reserved: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    arrived: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300",
    redeemed: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    expired: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
    donated: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Order Board</h1>
        <div className="flex gap-2 text-xs">
          {statuses.map((s) => (
            <span key={s} className={`rounded-full px-2 py-1 ${color[s]}`}>{s}</span>
          ))}
        </div>
      </div>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {deals.map((d) => (
          <DealTicker key={d.title} title={d.title} endsAt={d.endsAt} />
        ))}
        {acceptedParty.map((p) => (
          <PartyTicker key={p.label} label={p.label} pickupAt={p.pickupAt} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statuses.map((s) => (
          <div key={s} className="rounded-xl border p-5 dark:border-neutral-800">
            <h3 className="text-base font-semibold capitalize">{s}</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
              <li>Order #1234 • 5:30 PM • QR 8XY2 <span className="ml-2 rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] text-violet-700 dark:text-violet-300">Surprise</span></li>
              <li>Order #1235 • 5:45 PM • QR 9HZ1 <span className="ml-2 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-700 dark:text-emerald-300">Dietary</span></li>
              <li>Order #1236 • 6:05 PM • QR 2JK7 <span className="ml-2 rounded-full bg-cyan-500/15 px-2 py-0.5 text-[10px] text-cyan-700 dark:text-cyan-300">Local</span></li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function DealTicker({ title, endsAt }: { title: string; endsAt: number }) {
  const remaining = Math.max(0, endsAt - Date.now());
  const m = Math.max(0, Math.floor(remaining / 60000));
  const s = Math.max(0, Math.floor((remaining % 60000) / 1000));
  return (
    <div className="flex items-center justify-between rounded-lg border p-3 text-xs dark:border-neutral-800">
      <div className="font-medium">{title}</div>
      <div className="rounded-md bg-amber-500/15 px-2 py-1 text-amber-700 dark:text-amber-300">
        {m.toString().padStart(2, "0")}:{s.toString().padStart(2, "0")} left
      </div>
    </div>
  );
}

function PartyTicker({ label, pickupAt }: { label: string; pickupAt: number }) {
  const remaining = Math.max(0, pickupAt - Date.now());
  const m = Math.max(0, Math.floor(remaining / 60000));
  const s = Math.max(0, Math.floor((remaining % 60000) / 1000));
  return (
    <div className="flex items-center justify-between rounded-lg border p-3 text-xs dark:border-neutral-800">
      <div className="font-medium">{label}</div>
      <div className="rounded-md bg-violet-500/15 px-2 py-1 text-violet-700 dark:text-violet-300">
        {m.toString().padStart(2, "0")}:{s.toString().padStart(2, "0")} to pickup
      </div>
    </div>
  );
}
