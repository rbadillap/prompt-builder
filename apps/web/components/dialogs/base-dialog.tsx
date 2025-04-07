"use client"

import * as React from "react"
import { Action } from "@/types/actions"
import { Button } from "@workspace/ui/components/button"
import { DialogFooter } from "@workspace/ui/components/dialog"

interface BaseDialogProps {
  action: Action
}

export function BaseDialog({ action }: BaseDialogProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (formData: unknown) => {
    try {
      setIsLoading(true)
      // Here we'll handle the submission based on the action type
      console.log("Submitting form data:", formData)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-4 py-4">
      {/* This will be overridden by specific dialogs */}
      <div className="grid gap-2">
        <p className="text-sm text-muted-foreground">
          This is a base dialog component. Override this in specific dialog implementations.
        </p>
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Generate"}
        </Button>
      </DialogFooter>
    </div>
  )
}

export type BaseDialogType = typeof BaseDialog 