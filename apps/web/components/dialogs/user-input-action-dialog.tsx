"use client"

import * as React from "react"
import { Check, Pencil } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { UserInputDialog } from "@/components/dialogs/user-input-dialog"
import { useInputStore } from "@/store/input-store"

interface UserInputActionDialogProps {
  children: React.ReactNode
}

export function UserInputActionDialog({ children }: UserInputActionDialogProps) {
  const { config, setConfig } = useInputStore()
  const [open, setOpen] = React.useState(false)

  const handleSubmit = (data: unknown) => {
    const formData = data as { content: { label: string; placeholder: string; description: string } }
    setConfig(formData.content)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative">
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {config ? (
              <>
                <Pencil className="h-4 w-4" />
                Edit Input Configuration
              </>
            ) : (
              'Configure User Input'
            )}
          </DialogTitle>
        </DialogHeader>
        <UserInputDialog onSubmit={handleSubmit} initialData={config} />
      </DialogContent>
    </Dialog>
  )
} 