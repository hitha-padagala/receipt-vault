import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Receipt } from "@/types/receipt";
import { formatDate, formatMoney, isWarrantyActive } from "@/utils/date";

export function ReceiptCard({ receipt }: { receipt: Receipt }) {
  return (
    <Card className="p-4 transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-medium">{receipt.merchant}</div>
          <div className="mt-1 text-sm text-muted-foreground">{formatDate(receipt.purchaseDate)}</div>
        </div>
        <Badge tone="success">{formatMoney(receipt.amount)}</Badge>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>{receipt.category}</span>
        <span>{receipt.warrantyExpiry ? (isWarrantyActive(receipt.warrantyExpiry) ? "Active warranty" : "Warranty expired") : "No warranty"}</span>
      </div>
    </Card>
  );
}
