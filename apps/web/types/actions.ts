import { LucideIcon } from "lucide-react"

export type ActionProvider = "openai" | "anthropic" | "google" | "stability" | "mistral"

export interface BaseAction {
  id: string
  title: string
  description: string
  icon: LucideIcon
  tags: string[]
  provider: ActionProvider
}

export interface TextGenerationAction extends BaseAction {
  type: "text"
  maxLength?: number
  temperature?: number
}

export interface ImageGenerationAction extends BaseAction {
  type: "image"
  sizes: Array<{
    width: number
    height: number
    label: string
  }>
}

export interface TextToSpeechAction extends BaseAction {
  type: "speech"
  voices: Array<{
    id: string
    name: string
    preview?: string
  }>
}

export interface TranslationAction extends BaseAction {
  type: "translation"
  supportedLanguages: string[]
}

export interface ContentWritingAction extends BaseAction {
  type: "content"
  templates: Array<{
    id: string
    name: string
    description: string
  }>
}

export interface ChatAnalyzeAction extends BaseAction {
  type: "chat"
  features: Array<{
    id: string
    name: string
    description: string
  }>
}

export interface WritingImprovementAction extends BaseAction {
  type: "improvement"
  modes: Array<{
    id: string
    name: string
    description: string
  }>
}

export interface TextSummarizationAction extends BaseAction {
  type: "summary"
  maxLength?: number
}

export type Action =
  | TextGenerationAction
  | ImageGenerationAction
  | TextToSpeechAction
  | TranslationAction
  | ContentWritingAction
  | ChatAnalyzeAction
  | WritingImprovementAction
  | TextSummarizationAction

export type ActionType = Action["type"] 