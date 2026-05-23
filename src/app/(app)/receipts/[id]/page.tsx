import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { detailReceipt } from "@/data/mock";
import { Download, Pencil } from "lucide-react";

export default function ReceiptDetailPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <Card className="overflow-hidden xl:col-span-1">
        <div className="aspect-[4/5] bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-white">
          <div className="text-sm text-white/70">Receipt preview</div>
          <div className="mt-20 rounded-2xl bg-white/10 p-4 backdrop-blur">
            {detailReceipt.merchant}
            <div className="mt-2 text-2xl font-semibold">{detailReceipt.amount}</div>
          </div>
        </div>
      </Card>
      <div className="space-y-6 xl:col-span-2">
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-semibold">{detailReceipt.merchant}</h1>
              <p className="mt-2 text-muted-foreground">{detailReceipt.date}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline"><Pencil size={16} /> Edit</Button>
              <Button variant="gradient"><Download size={16} /> Download</Button>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Amount", detailReceipt.amount],
              ["Tax", detailReceipt.tax],
              ["Category", detailReceipt.category],
              ["Warranty", detailReceipt.warranty],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-muted p-4">
                <div className="text-xs text-muted-foreground">{label}</div>
                <div className="mt-1 font-medium">{value}</div>
              </div>
            ))}
          </div>
        </Card>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-5">
            <div className="text-lg font-semibold">OCR extracted text</div>
            <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-muted p-4 text-sm">{detailReceipt.ocr}</pre>
          </Card>
          <Card className="p-5">
            <div className="text-lg font-semibold">Items</div>
            <div className="mt-4 space-y-3">
              {detailReceipt.items.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-xl bg-muted p-3">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">Qty {item.qty}</div>
                  </div>
                  <Badge tone="outline">{item.price}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <Card className="p-5">
          <div className="text-lg font-semibold">Notes</div>
          <p className="mt-3 text-sm text-muted-foreground">{detailReceipt.notes}</p>
          <div className="mt-5 text-lg font-semibold">Warranty information</div>
          <p className="mt-3 text-sm text-muted-foreground">Warranty status is tracked automatically and reminders will surface before expiration.</p>
        </Card>
      </div>
    </div>
  );
}
