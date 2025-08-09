import Image from "next/image";

export default async function StorefrontPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams?: Promise<Record<string, string>> }) {
  const { slug } = await params;
  const q = (await searchParams) || {};
  const brandA = q.brandA || "#7c3aed";
  const brandB = q.brandB || "#06b6d4";
  const venue = {
    name: slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()),
    bio: "Rescuing good food with great value. Fresh bags drop daily.",
    cover: "/window.svg",
  };
  const bags = [
    { name: "Chef’s Picks", price: 4.99, badge: "Surprise" },
    { name: "Breakfast Bag", price: 3.49, badge: "Local" },
    { name: "Veggie Saver", price: 2.99, badge: "Dietary" },
  ];
  return (
    <div className="min-h-screen" style={{
      background: `radial-gradient(ellipse at top, ${brandA}22, transparent 60%), radial-gradient(ellipse at bottom right, ${brandB}22, transparent 60%)`,
    }}>
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-2xl border border-white/20 bg-white/60 p-8 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-4">
            <div className="size-12 overflow-hidden rounded-full border border-white/30">
              <Image src={venue.cover} width={96} height={96} alt="logo" className="h-full w-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{venue.name}</h1>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">{venue.bio}</p>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {bags.map((b) => (
              <div key={b.name} className="rounded-xl border p-4 dark:border-neutral-800">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{b.name}</div>
                  <span className="rounded-full bg-black/10 px-2 py-1 text-xs dark:bg-white/10">{b.badge}</span>
                </div>
                <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Ready today</div>
                <div className="mt-4 text-lg font-semibold">${b.price.toFixed(2)}</div>
                <button className="mt-4 w-full rounded-lg bg-black py-2 text-sm text-white dark:bg-white dark:text-black">Reserve</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


