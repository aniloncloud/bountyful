"use client";
import { Area, AreaChart, ResponsiveContainer, Tooltip, TooltipProps } from "recharts";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

export function AreaSpark({ data }: { data: { x: string; y: number }[] }) {
  const tooltipFormatter: TooltipProps<ValueType, NameType>["formatter"] = (value) => {
    return [String(value), ""] as [string, string];
  };
  return (
    <div className="h-16 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <Tooltip cursor={false} formatter={tooltipFormatter} />
          <Area type="monotone" dataKey="y" stroke="#111" fill="#111" fillOpacity={0.1} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
