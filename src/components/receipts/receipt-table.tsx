import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Receipt } from "@/types/receipt";
import { formatDate, formatMoney, isWarrantyActive } from "@/utils/date";

export function ReceiptTable({ receipts }: { receipts: Receipt[] }) {
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
          {receipts.map((receipt) => (
            <tr key={receipt.id} className="border-t border-border">
              <td className="px-4 py-3 font-medium">{receipt.merchant}</td>
              <td>{formatMoney(receipt.amount)}</td>
              <td><Badge tone="outline">{receipt.category}</Badge></td>
              <td>{formatDate(receipt.purchaseDate)}</td>
              <td>
                <Badge tone={isWarrantyActive(receipt.warrantyExpiry) ? "success" : "warning"}>
                  {receipt.warrantyExpiry ? `Expires ${formatDate(receipt.warrantyExpiry)}` : "No warranty"}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
