"use client";

import { UploadCloud, FileImage, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UploadZone() {
  return (
    <Card className="border-dashed p-8 text-center transition hover:-translate-y-1 hover:shadow-soft">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 text-white shadow-lg shadow-indigo-500/20">
        <UploadCloud size={28} />
      </div>
      <div className="mt-4 text-xl font-semibold">Drag and drop receipts here</div>
      <p className="mt-2 text-sm text-muted-foreground">Supports JPG, PNG, and PDF uploads. Multiple files are supported.</p>
      <Button variant="outline" className="mt-4">Browse files</Button>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {["receipt-june.pdf", "office-supplies.jpg", "flight-ticket.png"].map((file, index) => (
          <Card key={file} className="p-4 text-left">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-muted p-2">{index === 0 ? <FileText size={18} /> : <FileImage size={18} />}</div>
              <div>
                <div className="text-sm font-medium">{file}</div>
                <div className="text-xs text-muted-foreground">{index === 0 ? "PDF • 2.4 MB" : "Image • 1.2 MB"}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}
