"use client"

import { useInputStore } from "@/store/input-store"
import { UserInputActionDialog } from "@/components/dialogs/user-input-action-dialog"
import { PenSquare } from "lucide-react"

export function InputContainer() {
  const config = useInputStore((state) => state.config)

  return (
    <UserInputActionDialog>
      <div className="relative mx-auto h-24 w-full max-w-3xl rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/20 hover:bg-muted/30 hover:border-muted-foreground/40 transition-colors cursor-pointer flex flex-col items-center justify-center group">
        {config ? (
          <>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
              {config.label}
            </p>
            <p className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">
              Click to edit input configuration
            </p>
            <div className="absolute right-4 top-1/3 h-8 w-8 rounded-full bg-transparent group-hover:bg-accent transition-colors flex items-center justify-center">
            <PenSquare className="h-4 w-4 text-primary" />
            </div>
          </>
        ) : (
          <>
            <div className="absolute right-4 top-1/3 h-8 w-8 rounded-full bg-transparent group-hover:bg-accent transition-colors flex items-center justify-center">
              <PenSquare className="h-4 w-4 text-primary" />
            </div>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors">Define user input</p>
            <p className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">Click here to configure what information you need from users</p>
          </>
        )}
      </div>
    </UserInputActionDialog>
  )
} 