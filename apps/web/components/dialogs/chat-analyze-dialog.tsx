"use client"

import * as React from "react"
import { ChatAnalyzeAction } from "@/types/actions"
import { BaseDialog } from "./base-dialog"

interface ChatAnalyzeDialogProps {
  action: ChatAnalyzeAction
}

export function ChatAnalyzeDialog({ action }: ChatAnalyzeDialogProps) {
  return <BaseDialog action={action} />
} 