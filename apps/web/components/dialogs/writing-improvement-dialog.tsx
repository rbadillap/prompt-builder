"use client"

import * as React from "react"
import { WritingImprovementAction } from "@/types/actions"
import { BaseDialog } from "./base-dialog"

interface WritingImprovementDialogProps {
  action: WritingImprovementAction
}

export function WritingImprovementDialog({ action }: WritingImprovementDialogProps) {
  return <BaseDialog action={action} />
} 