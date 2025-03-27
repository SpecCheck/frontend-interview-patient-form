import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface OrderHeaderProps {
  patientFullName: string;
}

export function OrderHeader({ patientFullName }: OrderHeaderProps) {
  return (
    <header className="border-b border-border bg-white py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-lg font-medium text-foreground">
            {patientFullName}
          </h1>
          <div className="flex text-sm text-muted-foreground mt-1 space-x-4">
            <span>Production Lab</span>
            <span className="pl-4 border-l border-muted">Simplify Optics</span>
            <span className="pl-4 border-l border-muted">Vision Type</span>
            <span className="pl-4 border-l border-muted">Single Vision</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-foreground border-border">
            Save Draft
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Trash2 className="h-5 w-5" />
          </Button>
          <Button variant="outline" className="text-foreground border-border">
            Back
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Next
          </Button>
        </div>
      </div>
    </header>
  );
}
