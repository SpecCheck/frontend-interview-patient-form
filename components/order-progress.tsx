export function OrderProgress() {
  return (
    <div className="flex justify-center px-6 py-4 border-b border-border">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
          1
        </div>
        <span className="ml-2 font-medium">Overview</span>
        <div className="h-[1px] w-24 bg-muted mx-2"></div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-primary text-primary">
          2
        </div>
        <span className="ml-2 text-muted-foreground">
          Rx Entry & Lens Selection
        </span>
        <div className="h-[1px] w-24 bg-muted mx-2"></div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-primary text-primary">
          3
        </div>
        <span className="ml-2 text-muted-foreground">Frame Entry</span>
        <div className="h-[1px] w-24 bg-muted mx-2"></div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-primary text-primary">
          4
        </div>
        <span className="ml-2 text-muted-foreground">
          Order Details Confirmation
        </span>
      </div>
    </div>
  );
}
