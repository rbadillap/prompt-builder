import { LucideIcon } from "lucide-react"

// Define primitive types here as the source of truth
export type PrimitiveNodeType = 'text' | 'image' | 'audio'

export type ActionProvider = "openai" | "anthropic" | "google" | "stability" | "mistral"

export interface BaseAction {
  id: string
  title: string
  description: string
  icon: LucideIcon
  tags: string[]
  provider: ActionProvider
  input?: PrimitiveNodeType[]    // Add input/output types to BaseAction
  output: PrimitiveNodeType      // Every action must define its output type
}

export interface TextGenerationAction extends BaseAction {
  type: "text"
  maxLength?: number
  temperature?: number
  input: []
  output: 'text'
}

export interface ImageGenerationAction extends BaseAction {
  type: "image"
  sizes: Array<{
    width: number
    height: number
    label: string
  }>
  input: ['text']
  output: 'image'
}

export interface TextToSpeechAction extends BaseAction {
  type: "speech"
  voices: Array<{
    id: string
    name: string
    preview?: string
  }>
  input: ['text']
  output: 'audio'
}

export interface TranslationAction extends BaseAction {
  type: "translation"
  supportedLanguages: string[]
  input: ['text']
  output: 'text'
}

export interface ContentWritingAction extends BaseAction {
  type: "content"
  templates: Array<{
    id: string
    name: string
    description: string
  }>
  input: ['text']
  output: 'text'
}

export interface ChatAnalyzeAction extends BaseAction {
  type: "chat"
  features: Array<{
    id: string
    name: string
    description: string
  }>
  input: ['text']
  output: 'text'
}

export interface WritingImprovementAction extends BaseAction {
  type: "improvement"
  modes: Array<{
    id: string
    name: string
    description: string
  }>
  input: ['text']
  output: 'text'
}

export interface TextSummarizationAction extends BaseAction {
  type: "summary"
  maxLength?: number
  input: ['text']
  output: 'text'
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