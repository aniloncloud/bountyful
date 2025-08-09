export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Order {id}</h1>
      <div className="rounded-xl border p-5 text-sm dark:border-neutral-800">
        <div className="grid gap-2 md:grid-cols-2">
          <div>
            <div className="text-neutral-600 dark:text-neutral-400">Customer</div>
            <div className="font-medium">Jordan Guest</div>
          </div>
          <div>
            <div className="text-neutral-600 dark:text-neutral-400">Pickup Time</div>
            <div className="font-medium">5:30 PM</div>
          </div>
          <div className="md:col-span-2">
            <div className="text-neutral-600 dark:text-neutral-400">Items</div>
            <ul className="list-disc pl-5">
              <li>Magic Bag x1</li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-neutral-600 dark:text-neutral-400">Notes / Allergens</div>
            <p>Contains nuts</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="rounded-lg border px-3 py-2 text-sm dark:border-neutral-800">Chat Customer</button>
          <button className="rounded-lg border px-3 py-2 text-sm dark:border-neutral-800">Call Customer</button>
          <button className="rounded-lg border px-3 py-2 text-sm dark:border-neutral-800">Relist</button>
          <button className="rounded-lg border px-3 py-2 text-sm dark:border-neutral-800">Donate</button>
          <button className="rounded-lg border px-3 py-2 text-sm dark:border-neutral-800">Report Issue</button>
        </div>
      </div>
    </div>
  );
}
