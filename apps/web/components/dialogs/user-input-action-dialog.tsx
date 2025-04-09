"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { UserInputDialog } from "./user-input-dialog"

interface UserInputActionDialogProps {
  children: React.ReactNode
}

export function UserInputActionDialog({ children }: UserInputActionDialogProps) {
  const handleSubmit = (data: unknown) => {
    console.log("Form submitted:", data)
    // Here we'll handle the form submission
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Configure User Input</DialogTitle>
        </DialogHeader>
        <UserInputDialog onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
} 