import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Receipt } from "@/types/receipt";
import { Trash2 } from "lucide-react";
import { formatDate, formatMoney, isWarrantyActive } from "@/utils/date";

export function ReceiptCard({
  receipt,
  onDelete,
}: {
  receipt: Receipt;
  onDelete?: (receipt: Receipt) => void;
}) {
  return (
    <Card className="p-4 transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-medium">{receipt.merchant}</div>
          <div className="mt-1 text-sm text-muted-foreground">{formatDate(receipt.purchaseDate)}</div>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone="success">{formatMoney(receipt.amount)}</Badge>
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
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>{receipt.category}</span>
        <span>{receipt.warrantyExpiry ? (isWarrantyActive(receipt.warrantyExpiry) ? "Active warranty" : "Warranty expired") : "No warranty"}</span>
      </div>
    </Card>
  );
}
