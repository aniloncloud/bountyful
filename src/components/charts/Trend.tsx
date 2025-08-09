"use client";

import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Area, AreaChart, BarChart, Bar } from "recharts";

type Point = { x: string | number; a: number; b?: number };

export function LineTrend({ data }: { data: Point[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
          <XAxis dataKey="x" tick={{ fontSize: 12 }} />
          <YAxis width={40} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="a" stroke="#7c3aed" strokeWidth={2} dot={false} />
          {data.some((d) => d.b != null) && (
            <Line type="monotone" dataKey="b" stroke="#06b6d4" strokeWidth={2} dot={false} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AreaTrend({ data }: { data: Point[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
          <XAxis dataKey="x" tick={{ fontSize: 12 }} />
          <YAxis width={40} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Area type="monotone" dataKey="a" stroke="#a855f7" fill="#a855f7" fillOpacity={0.15} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BarMini({ data }: { data: { x: string; v: number }[] }) {
  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <XAxis dataKey="x" tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="v" fill="#06b6d4" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


