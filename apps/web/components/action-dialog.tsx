"use client"

import * as React from "react"
import { Action, ActionType } from "@/types/actions"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { TextGenerationDialog } from "@/components/dialogs/text-generation-dialog"
import { ImageGenerationDialog } from "@/components/dialogs/image-generation-dialog"
import { TextToSpeechDialog } from "@/components/dialogs/text-to-speech-dialog"
import { TranslationDialog } from "@/components/dialogs/translation-dialog"
import { ContentWritingDialog } from "@/components/dialogs/content-writing-dialog"
import { ChatAnalyzeDialog } from "@/components/dialogs/chat-analyze-dialog"
import { WritingImprovementDialog } from "@/components/dialogs/writing-improvement-dialog"
import { TextSummarizationDialog } from "@/components/dialogs/text-summarization-dialog"

const dialogComponents: Record<
  ActionType,
  React.ComponentType<{ action: Action }>
> = {
  text: TextGenerationDialog,
  image: ImageGenerationDialog,
  speech: TextToSpeechDialog,
  translation: TranslationDialog,
  content: ContentWritingDialog,
  chat: ChatAnalyzeDialog,
  improvement: WritingImprovementDialog,
  summary: TextSummarizationDialog,
}

interface ActionDialogProps {
  action: Action
  trigger?: React.ReactNode
  children?: React.ReactNode
}

export function ActionDialog({ action, trigger, children }: ActionDialogProps) {
  const DialogComponent = dialogComponents[action.type]

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{action.title}</DialogTitle>
          <DialogDescription>
            {action.description}
          </DialogDescription>
        </DialogHeader>
        <DialogComponent action={action} />
      </DialogContent>
    </Dialog>
  )
} 