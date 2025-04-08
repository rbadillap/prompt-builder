"use client"

import * as React from "react"
import { ActionType, PrimitiveNodeType, type Action } from "@/types/actions"
import { type DialogFormData } from "@/types/dialogs"
import { useBuilder } from "@/components/builder/context"
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

const dialogComponents = {
  text: TextGenerationDialog,
  image: ImageGenerationDialog,
  speech: TextToSpeechDialog,
  translation: TranslationDialog,
  content: ContentWritingDialog,
  chat: ChatAnalyzeDialog,
  improvement: WritingImprovementDialog,
  summary: TextSummarizationDialog,
} as const

interface ActionDialogProps {
  action: Action
  trigger?: React.ReactNode
  children?: React.ReactNode
}

export function ActionDialog({ action, trigger, children }: ActionDialogProps) {
  const { addNode } = useBuilder()
  const DialogComponent = dialogComponents[action.type]

  const handleSubmit = React.useCallback(
    (formData: DialogFormData) => {
      console.log('action', action)
      // Add node to the builder with the form data
      addNode({
        type: 'base',
        label: action.title,
        icon: action.icon,
        input: action.input,
        output: action.output,
        content: {
          display: action.title,
          data: formData.content
        }
      })
    },
    [action, addNode]
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || children}
      </DialogTrigger>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>{action.title}</DialogTitle>
          <DialogDescription>
            {action.description}
          </DialogDescription>
        </DialogHeader>
        <DialogComponent 
          action={action as never} 
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  )
} 