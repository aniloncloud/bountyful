"use client";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "Mon", gmV: 400, units: 24 },
  { name: "Tue", gmV: 300, units: 18 },
  { name: "Wed", gmV: 600, units: 33 },
  { name: "Thu", gmV: 500, units: 28 },
  { name: "Fri", gmV: 900, units: 50 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Analytics & Insights</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border p-5 dark:border-neutral-800">
          <h3 className="text-base font-semibold">GMV vs Units</h3>
          <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="gmV" stroke="#111" />
              <Line type="monotone" dataKey="units" stroke="#888" />
            </LineChart>
          </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border p-5 dark:border-neutral-800">
          <h3 className="text-base font-semibold">Category Mix</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{ name: "Bags", value: 52 }, { name: "Bundles", value: 31 }, { name: "Meals", value: 19 }]} dataKey="value" nameKey="name" outerRadius={90} label>
                  <Cell fill="#7c3aed" />
                  <Cell fill="#06b6d4" />
                  <Cell fill="#f59e0b" />
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="rounded-xl border p-5 text-sm dark:border-neutral-800">
        <p>Inventory insights, customer feedback, heatmaps, and benchmark comparisons will be shown here. Coming soon: cohort retention and markdown effectiveness.</p>
      </div>
    </div>
  );
}
