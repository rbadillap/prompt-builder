"use client"

import { useInputStore } from "@/store/input-store"
import { UserInputActionDialog } from "@/components/dialogs/user-input-action-dialog"

export function InputContainer() {
  const config = useInputStore((state) => state.config)

  return (
    <UserInputActionDialog>
      <div className="mx-auto h-24 w-full max-w-3xl rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/20 hover:bg-muted/30 hover:border-muted-foreground/40 transition-colors cursor-pointer flex flex-col items-center justify-center group">
        {config ? (
          <>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
              {config.label}
            </p>
            <p className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">
              Click to edit input configuration
            </p>
          </>
        ) : (
          <>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors">Define user input</p>
            <p className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">Click here to configure what information you need from users</p>
          </>
        )}
      </div>
    </UserInputActionDialog>
  )
} 