"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useReceiptStore } from "@/store/receipt-store";
import { formatMoney } from "@/utils/date";
import { ArrowLeft, Mail, ShieldCheck, UserCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const receipts = useReceiptStore((s) => s.receipts);

  const totalSpent = receipts.reduce((sum, receipt) => sum + receipt.amount, 0);
  const categories = new Set(receipts.map((receipt) => receipt.category)).size;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold">Profile</h1>
          <p className="mt-2 text-muted-foreground">A simple overview of your account and receipt activity.</p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft size={16} /> Back
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-indigo-700 via-sky-700 to-cyan-600 px-6 py-8 text-white">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
              <UserCircle2 size={34} />
            </div>
            <div>
              <div className="text-2xl font-semibold">Demo User</div>
              <div className="mt-1 text-white/80">demo@receiptvault.local</div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-muted p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail size={14} /> Email
            </div>
            <div className="mt-2 font-medium">demo@receiptvault.local</div>
          </div>
          <div className="rounded-2xl bg-muted p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck size={14} /> Role
            </div>
            <div className="mt-2 font-medium capitalize">member</div>
          </div>
          <div className="rounded-2xl bg-muted p-4">
            <div className="text-sm text-muted-foreground">Receipts</div>
            <div className="mt-2 font-medium">{receipts.length}</div>
          </div>
          <div className="rounded-2xl bg-muted p-4">
            <div className="text-sm text-muted-foreground">Total spent</div>
            <div className="mt-2 font-medium">{formatMoney(totalSpent)}</div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="text-lg font-semibold">Account details</div>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-xl bg-muted px-4 py-3">
              <span className="text-muted-foreground">User ID</span>
              <span className="font-medium">demo-user</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-muted px-4 py-3">
              <span className="text-muted-foreground">Account status</span>
              <Badge tone="success">Active</Badge>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-muted px-4 py-3">
              <span className="text-muted-foreground">Categories tracked</span>
              <span className="font-medium">{categories}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-lg font-semibold">Quick actions</div>
          <div className="mt-4 grid gap-3">
            <Button variant="outline" onClick={() => router.push("/receipts")}>
              View receipts
            </Button>
            <Button variant="outline" onClick={() => router.push("/upload")}>
              Upload receipt
            </Button>
            <Button variant="outline" onClick={() => router.push("/settings")}>
              Open settings
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
