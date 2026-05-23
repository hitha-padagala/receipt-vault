import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ReceiptCard({ merchant, amount, category, date }: { merchant: string; amount: string; category: string; date: string }) {
  return (
    <Card className="p-4 transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-medium">{merchant}</div>
          <div className="mt-1 text-sm text-muted-foreground">{date}</div>
        </div>
        <Badge tone="success">{amount}</Badge>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">{category}</div>
    </Card>
  );
}
