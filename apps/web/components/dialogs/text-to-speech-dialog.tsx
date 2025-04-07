"use client"

import * as React from "react"
import { TextToSpeechAction } from "@/types/actions"
import { BaseDialog } from "./base-dialog"

interface TextToSpeechDialogProps {
  action: TextToSpeechAction
}

export function TextToSpeechDialog({ action }: TextToSpeechDialogProps) {
  return <BaseDialog action={action} />
} 