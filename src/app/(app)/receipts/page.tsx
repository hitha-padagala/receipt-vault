import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { receipts } from "@/data/mock";
import { ReceiptCard } from "@/components/receipts/receipt-card";
import { ReceiptTable } from "@/components/receipts/receipt-table";

export default function ReceiptsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Receipts</h1>
          <p className="mt-2 text-muted-foreground">Search, sort, and review every receipt in one place.</p>
        </div>
        <div className="flex gap-2">
          <Badge tone="outline">Table view</Badge>
          <Badge tone="success">Grid view</Badge>
        </div>
      </div>
      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <Input placeholder="Search merchant or amount" />
          <Input placeholder="Filter category" />
          <Input placeholder="Sort by date" />
          <Input placeholder="Warranty status" />
        </div>
      </Card>
      <ReceiptTable />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {receipts.map((receipt) => <ReceiptCard key={receipt.id} merchant={receipt.merchant} amount={receipt.amount} category={receipt.category} date={receipt.date} />)}
      </div>
      <Card className="p-4 text-sm text-muted-foreground">Pagination: 1 2 3 ... 12</Card>
    </div>
  );
}
