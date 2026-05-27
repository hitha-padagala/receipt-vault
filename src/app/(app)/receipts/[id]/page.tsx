"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useReceiptStore } from "@/store/receipt-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatDate, formatMoney, isWarrantyActive } from "@/utils/date";
import { Download, Pencil, ArrowLeft, Save, X } from "lucide-react";
import { ReceiptCategory } from "@/types/receipt";

export default function ReceiptDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const fetchReceipt = useReceiptStore((s) => s.fetchReceipt);
  const updateReceipt = useReceiptStore((s) => s.updateReceipt);
  const receipt = useReceiptStore((s) => s.selectedReceipt);
  const loading = useReceiptStore((s) => s.loading);
  const error = useReceiptStore((s) => s.error);
  const [editing, setEditing] = useState(false);
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ReceiptCategory>("Shopping");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [warrantyExpiry, setWarrantyExpiry] = useState("");
  const [ocrText, setOcrText] = useState("");

  useEffect(() => {
    if (receipt) {
      setMerchant(receipt.merchant);
      setAmount(String(receipt.amount));
      setCategory(receipt.category);
      setPurchaseDate(receipt.purchaseDate);
      setWarrantyExpiry(receipt.warrantyExpiry ?? "");
      setOcrText(receipt.ocrText ?? "");
    }
  }, [receipt]);

  useEffect(() => {
    if (params.id) void fetchReceipt(params.id);
  }, [fetchReceipt, params.id]);

  if (loading && !receipt) {
    return <div className="h-96 animate-pulse rounded-2xl bg-muted" />;
  }

  if (error) {
    return <Card className="p-6 text-rose-600">{error}</Card>;
  }

  if (!receipt) {
    return <Card className="p-6">Receipt not found.</Card>;
  }

  const saveChanges = async () => {
    await updateReceipt(receipt.id, {
      merchant,
      amount: Number(amount),
      category,
      purchaseDate,
      warrantyExpiry: warrantyExpiry || null,
      ocrText: ocrText || null,
    });
    setEditing(false);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <Card className="overflow-hidden xl:col-span-1">
        <div className="aspect-[4/5] bg-muted">
          <img src={receipt.imageUrl} alt={receipt.merchant} className="h-full w-full object-cover" />
        </div>
      </Card>

      <div className="space-y-6 xl:col-span-2">
        <Card className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Button variant="ghost" className="mb-4 px-0 text-muted-foreground" onClick={() => router.back()}>
                <ArrowLeft size={16} /> Back
              </Button>
              {editing ? (
                <div className="space-y-3">
                  <Input value={merchant} onChange={(e) => setMerchant(e.target.value)} />
                  <div className="grid gap-3 md:grid-cols-2">
                    <Input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" step="0.01" />
                    <Select value={category} onChange={(e) => setCategory(e.target.value as ReceiptCategory)}>
                      <option value="Electronics">Electronics</option>
                      <option value="Groceries">Groceries</option>
                      <option value="Medical">Medical</option>
                      <option value="Fuel">Fuel</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Travel">Travel</option>
                      <option value="Software">Software</option>
                    </Select>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Input value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} type="date" />
                    <Input value={warrantyExpiry} onChange={(e) => setWarrantyExpiry(e.target.value)} type="date" />
                  </div>
                  <Textarea value={ocrText} onChange={(e) => setOcrText(e.target.value)} rows={4} />
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-semibold">{receipt.merchant}</h1>
                  <p className="mt-2 text-muted-foreground">{formatDate(receipt.purchaseDate)}</p>
                </>
              )}
            </div>
            <div className="flex gap-2">
              {editing ? (
                <>
                  <Button variant="outline" onClick={() => setEditing(false)}>
                    <X size={16} /> Cancel
                  </Button>
                  <Button variant="gradient" onClick={() => void saveChanges()}>
                    <Save size={16} /> Save
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => setEditing(true)}>
                  <Pencil size={16} /> Edit
                </Button>
              )}
              <Button variant="gradient">
                <Download size={16} /> Download
              </Button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Amount", formatMoney(receipt.amount)],
              ["Tax", formatMoney(receipt.tax)],
              ["Category", receipt.category],
              ["Warranty", receipt.warrantyExpiry ? (isWarrantyActive(receipt.warrantyExpiry) ? "Active" : "Expired") : "None"],
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
            <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-muted p-4 text-sm">{receipt.ocrText}</pre>
          </Card>
          <Card className="p-5">
            <div className="text-lg font-semibold">Items</div>
            <div className="mt-4 space-y-3">
              {receipt.items.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-xl bg-muted p-3">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">Qty {item.quantity}</div>
                  </div>
                  <Badge tone="outline">{formatMoney(item.price)}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <div className="text-lg font-semibold">Notes</div>
          <p className="mt-3 text-sm text-muted-foreground">{receipt.notes}</p>
          <div className="mt-5 text-lg font-semibold">Warranty information</div>
          <p className="mt-3 text-sm text-muted-foreground">
            {receipt.warrantyExpiry
              ? `Warranty ${isWarrantyActive(receipt.warrantyExpiry) ? "is active until" : "expired on"} ${formatDate(receipt.warrantyExpiry)}.`
              : "No warranty tracked for this receipt."}
          </p>
        </Card>
      </div>
    </div>
  );
}
