"use client"

import * as React from "react"
import { ImageGenerationAction } from "@/types/actions"
import { BaseDialog } from "./base-dialog"

interface ImageGenerationDialogProps {
  action: ImageGenerationAction
}

export function ImageGenerationDialog({ action }: ImageGenerationDialogProps) {
  return <BaseDialog action={action} />
} 