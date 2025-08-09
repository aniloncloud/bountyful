import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaSpark } from "@/components/charts/AreaSpark";

export function StatCard({ title, value, data }: { title: string; value: string; data: { x: string; y: number }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-4">
          <div className="text-2xl font-semibold">{value}</div>
          <AreaSpark data={data} />
        </div>
      </CardContent>
    </Card>
  );
}
