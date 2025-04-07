"use client"

import * as React from "react"
import { TranslationAction } from "@/types/actions"
import { BaseDialog } from "./base-dialog"

interface TranslationDialogProps {
  action: TranslationAction
}

export function TranslationDialog({ action }: TranslationDialogProps) {
  return <BaseDialog action={action} />
} 