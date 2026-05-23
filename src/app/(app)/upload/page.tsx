import { UploadZone } from "@/components/upload/upload-zone";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/upload/progress";

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Upload receipts</h1>
        <p className="mt-2 text-muted-foreground">Drag in JPG, PNG, or PDF files and let the vault organize them.</p>
      </div>
      <UploadZone />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5">
          <div className="text-sm text-muted-foreground">Processing queue</div>
          <div className="mt-2 text-2xl font-semibold">3 files</div>
          <Progress value={72} />
        </Card>
        <Card className="p-5">
          <div className="text-sm text-muted-foreground">OCR confidence</div>
          <div className="mt-2 text-2xl font-semibold">96.4%</div>
          <Badge tone="success" className="mt-3">Ready for review</Badge>
        </Card>
        <Card className="p-5">
          <div className="text-sm text-muted-foreground">Auto-tagging</div>
          <div className="mt-2 text-2xl font-semibold">Enabled</div>
          <div className="mt-3 text-sm text-muted-foreground">Categories are assigned from OCR and merchant patterns.</div>
        </Card>
      </div>
    </div>
  );
}
