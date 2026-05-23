import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { receipts } from "@/data/mock";

export function ReceiptTable() {
  return (
    <Card className="overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/70 text-muted-foreground">
          <tr>
            <th className="px-4 py-3">Merchant</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Purchase date</th>
            <th>Warranty</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((r) => (
            <tr key={r.merchant} className="border-t border-border">
              <td className="px-4 py-3 font-medium">{r.merchant}</td>
              <td>{r.amount}</td>
              <td><Badge tone="outline">{r.category}</Badge></td>
              <td>{r.date}</td>
              <td><Badge tone={r.status as "default" | "success" | "warning" | "outline"}>{r.warranty}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
