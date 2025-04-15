import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@workspace/ui/components/sheet"
import { Button } from "@workspace/ui/components/button"

interface DeploySheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeploySheet({ open, onOpenChange }: DeploySheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[500px]">
        <div className="space-y-6 px-2">
          <SheetHeader>
            <SheetTitle>Deploy to Vercel</SheetTitle>
            <SheetDescription>
              Deploy your workflow as a standalone application
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4">
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your workflow will be deployed as a full-featured web application on Vercel's platform. 
                This includes:
              </p>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground list-disc list-inside">
                <li>A modern web interface for your workflow</li>
                <li>Serverless API endpoints for each node</li>
                <li>Automatic scaling and global CDN distribution</li>
                <li>Real-time execution and monitoring</li>
              </ul>
            </div>

            <div className="flex justify-center">
              <a href="https://vercel.com/new/clone" target="_blank" rel="noopener noreferrer">
                <img src="https://vercel.com/button" alt="Deploy with Vercel" />
              </a>
            </div>
          </div>

          <SheetFooter>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
} 