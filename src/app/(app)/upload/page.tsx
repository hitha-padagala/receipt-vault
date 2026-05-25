"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/upload/progress";
import { useReceiptStore } from "@/store/receipt-store";
import { FileText, Image as ImageIcon, UploadCloud, X } from "lucide-react";
import { formatMoney } from "@/utils/date";

type PreviewItem = {
  file: File;
  preview: string;
};

export default function UploadPage() {
  const upload = useReceiptStore((s) => s.upload);
  const uploadProgress = useReceiptStore((s) => s.uploadProgress);
  const uploadError = useReceiptStore((s) => s.uploadError);
  const [items, setItems] = useState<PreviewItem[]>([]);

  const previews = useMemo(() => items, [items]);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    const next = Array.from(files)
      .filter((file) => allowed.includes(file.type))
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
    setItems((current) => [...next, ...current]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Upload receipts</h1>
        <p className="mt-2 text-muted-foreground">Drag and drop JPG, PNG, or PDF files to add them to the vault.</p>
      </div>

      <label className="block cursor-pointer rounded-3xl border border-dashed border-border bg-background/70 p-10 text-center transition hover:-translate-y-1 hover:shadow-soft">
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
          className="hidden"
          onChange={(event) => addFiles(event.target.files)}
        />
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 text-white shadow-lg shadow-indigo-500/20">
          <UploadCloud size={28} />
        </div>
        <div className="mt-4 text-xl font-semibold">Drop files here or click to browse</div>
        <p className="mt-2 text-sm text-muted-foreground">Supported file types: JPG, PNG, PDF</p>
      </label>

      {uploadProgress > 0 && (
        <Card className="p-5">
          <div className="flex items-center justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} />
        </Card>
      )}

      {uploadError && <Card className="border-rose-200 p-5 text-rose-600">{uploadError}</Card>}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {previews.map(({ file, preview }) => (
          <Card key={`${file.name}-${file.size}`} className="overflow-hidden">
            <div className="aspect-video bg-muted">
              {file.type === "application/pdf" ? (
                <div className="flex h-full items-center justify-center">
                  <FileText size={40} className="text-muted-foreground" />
                </div>
              ) : (
                <img src={preview} alt={file.name} className="h-full w-full object-cover" />
              )}
            </div>
            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium">{file.name}</div>
                  <div className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</div>
                </div>
                <Button variant="ghost" onClick={() => setItems((current) => current.filter((item) => item.file !== file))}>
                  <X size={16} />
                </Button>
              </div>
              <Button className="w-full" onClick={() => void upload(file)}>
                Save receipt
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-5 text-sm text-muted-foreground">
        Fake upload workflow enabled. New receipts are appended to the local store and reflected across the app immediately.
      </Card>
    </div>
  );
}
