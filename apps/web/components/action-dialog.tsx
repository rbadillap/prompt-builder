"use client"

import * as React from "react"
import { ActionType, PrimitiveNodeType, type Action } from "@/types/actions"
import { type DialogFormData } from "@/types/dialogs"
import { useBuilder } from "@/components/builder/context"
import { useWorkflowStore } from "@/store/workflow-store"
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
  const { addNode: addNodeToBuilder } = useBuilder()
  const { addNode: addNodeToWorkflow, updateNodeConfig } = useWorkflowStore()
  const DialogComponent = dialogComponents[action.type]

  const handleSubmit = React.useCallback(
    (formData: DialogFormData) => {
      // Generate node ID that will be used by both stores
      const nodeId = `node-${Date.now()}`

      // Create the node data
      const nodeData = {
        type: action.type,
        label: action.title,
        icon: action.icon,
        input: action.input,
        output: action.output,
        content: {
          display: action.title,
          data: formData.content
        }
      }

      // Add node to the builder UI
      addNodeToBuilder(nodeData)

      // Add node to the workflow store
      addNodeToWorkflow({
        id: nodeId,
        type: action.type,
        position: { x: 0, y: 0 }, // Position will be set by BuilderProvider
        data: nodeData
      })

      // Store the node configuration
      updateNodeConfig(nodeId, formData.content)
    },
    [action, addNodeToBuilder, addNodeToWorkflow, updateNodeConfig]
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