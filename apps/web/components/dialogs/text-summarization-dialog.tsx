"use client"

import * as React from "react"
import { TextSummarizationAction } from "@/types/actions"
import { BaseDialog } from "./base-dialog"

interface TextSummarizationDialogProps {
  action: TextSummarizationAction
}

export function TextSummarizationDialog({ action }: TextSummarizationDialogProps) {
  return <BaseDialog action={action} />
} 