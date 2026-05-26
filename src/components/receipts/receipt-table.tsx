import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Receipt } from "@/types/receipt";
import { Trash2 } from "lucide-react";
import { formatDate, formatMoney, isWarrantyActive } from "@/utils/date";

export function ReceiptTable({
  receipts,
  onDelete,
}: {
  receipts: Receipt[];
  onDelete?: (receipt: Receipt) => void;
}) {
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
            <th className="px-4 py-3 text-right">Actions</th>
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
              <td className="px-4 py-3 text-right">
                {onDelete && (
                  <Button
                    variant="ghost"
                    className="h-9 w-9 rounded-full p-0 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                    onClick={() => onDelete(receipt)}
                    aria-label={`Delete ${receipt.merchant}`}
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
