"use client"

import * as React from "react"
import { ContentWritingAction } from "@/types/actions"
import { BaseDialog } from "./base-dialog"

interface ContentWritingDialogProps {
  action: ContentWritingAction
}

export function ContentWritingDialog({ action }: ContentWritingDialogProps) {
  return <BaseDialog action={action} />
} 