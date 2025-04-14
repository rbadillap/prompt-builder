import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet"

interface DeploySheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeploySheet({ open, onOpenChange }: DeploySheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Deploy to Vercel</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          Hello World
        </div>
      </SheetContent>
    </Sheet>
  )
} 