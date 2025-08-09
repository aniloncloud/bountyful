import Link from "next/link";

export default function InventoryListingsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Listings</h1>
        <Link className="rounded-lg bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black" href="/inventory/new">New Listing</Link>
      </div>
      <div className="rounded-xl border p-5 text-sm dark:border-neutral-800">
        <div className="mb-3 flex flex-wrap gap-2">
          <input className="w-full max-w-xs rounded-lg border px-3 py-2 dark:border-neutral-800 dark:bg-neutral-900" placeholder="Search by name or SKU" />
          <select className="rounded-lg border px-3 py-2 dark:border-neutral-800 dark:bg-neutral-900"><option>All Categories</option><option>Magic Bag</option><option>Menu Item</option></select>
          <select className="rounded-lg border px-3 py-2 dark:border-neutral-800 dark:bg-neutral-900"><option>Status: All</option><option>Active</option><option>Paused</option><option>Draft</option></select>
        </div>
        <div className="overflow-hidden rounded-lg border dark:border-neutral-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-900">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2">Qty</th>
                <th className="px-3 py-2">Price</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Magic Bag - Friday", cat: "Magic Bag", qty: 24, price: 4.99, status: "Active" },
                { name: "Breakfast Bundle", cat: "Bundle", qty: 10, price: 6.5, status: "Paused" },
                { name: "Caesar Salad", cat: "Menu Item", qty: 8, price: 3.25, status: "Draft" },
              ].map((r) => (
                <tr key={r.name} className="border-t dark:border-neutral-800">
                  <td className="px-3 py-2">{r.name}</td>
                  <td className="px-3 py-2">{r.cat}</td>
                  <td className="px-3 py-2">{r.qty}</td>
                  <td className="px-3 py-2">${r.price.toFixed(2)}</td>
                  <td className="px-3 py-2">
                    <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs text-emerald-700 dark:text-emerald-300">{r.status}</span>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <Link href="/inventory/new" className="rounded-md border px-2 py-1 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


