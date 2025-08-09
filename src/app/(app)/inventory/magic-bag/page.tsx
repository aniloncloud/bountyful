export default function MagicBagsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Magic Bags</h1>
        <button className="rounded-lg bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black">Create Magic Bag</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border p-5 dark:border-neutral-800">
          <h3 className="text-base font-semibold">Quick Setup</h3>
          <div className="mt-3 space-y-3">
            <label className="block">
              <span className="block text-xs text-neutral-500 dark:text-neutral-400">Bag Name</span>
              <input type="text" placeholder="e.g. Chef's Surprise" className="mt-1 w-full rounded-lg border px-3 py-2 dark:border-neutral-800 dark:bg-neutral-900" />
            </label>
            <label className="block">
              <span className="block text-xs text-neutral-500 dark:text-neutral-400">Price</span>
              <input type="number" placeholder="4.99" className="mt-1 w-full rounded-lg border px-3 py-2 dark:border-neutral-800 dark:bg-neutral-900" />
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Make this a daily recurring bag</span>
            </label>
            <button className="w-full rounded-lg bg-black px-3 py-2 text-sm text-white dark:bg-white dark:text-black">Create Bag</button>
          </div>
        </div>

        <div className="rounded-xl border p-5 dark:border-neutral-800">
          <h3 className="text-base font-semibold">Active Magic Bags</h3>
          <div className="mt-3 space-y-2">
            {[
              { name: "Chef's Picks", price: 4.99, status: "Active" },
              { name: "Breakfast Bag", price: 3.49, status: "Daily" },
              { name: "Veggie Saver", price: 2.99, status: "Sold Out" },
            ].map((bag) => (
              <div key={bag.name} className="flex items-center justify-between rounded-lg border p-3 dark:border-neutral-800">
                <div>
                  <div className="font-medium">{bag.name}</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-300">${bag.price.toFixed(2)}</div>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs ${
                  bag.status === 'Active' ? 'bg-green-100 text-green-800' :
                  bag.status === 'Daily' ? 'bg-blue-100 text-blue-800' :
                  'bg-neutral-100 text-neutral-800'
                }`}>
                  {bag.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
