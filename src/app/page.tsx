"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";

export default function Page() {
  const handleSuccess = () => {
    toast.success("Success");
  }
  const handleError = () => {
    toast.error("Error");
  }
  const handleWarning = () => {
    toast.info("Warning");
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted p-8">
      <Button onClick={handleSuccess}>
        <span>Success</span>
      </Button>
      <Button onClick={handleWarning}>
        <span>Warning</span>
      </Button>
      <Button variant={"destructive"} onClick={handleError}>
        <span>Error</span>
      </Button>
      <Button>
        <span>Button</span>
      </Button>
      <Button>
        <span>Button</span>
      </Button>
    </main>
  )
}
