import type { Node, NodeConfig } from "@/types/actions"
import type { InputConfig } from "@/types/input"

interface DeploymentConfig {
  nodes: Node[]
  nodeConfigs: Record<string, NodeConfig>
  inputConfig?: InputConfig
}

interface GeneratedFiles {
  'page.tsx': string
  'api/chat/route.ts': string
  'components/workflow.tsx': string
  'lib/store.ts': string
}

export async function generateDeploymentFiles(config: DeploymentConfig): Promise<GeneratedFiles> {
  const { nodes, nodeConfigs, inputConfig } = config
  
  // Generate the page component
  const pageContent = `
import { Workflow } from "@/components/workflow"

export default function WorkflowPage() {
  return (
    <main className="container mx-auto p-4">
      <Workflow />
    </main>
  )
}`

  // Generate the workflow component with embedded configuration
  const workflowContent = `
"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWorkflowStore } from "@/lib/store"

export function Workflow() {
  const { messages, append } = useChat()
  const [input, setInput] = React.useState("")
  const { nodes, nodeConfigs, executeWorkflow } = useWorkflowStore()

  // Embed the workflow configuration
  React.useEffect(() => {
    // Initialize the store with the embedded configuration
    useWorkflowStore.setState({
      nodes: ${JSON.stringify(nodes, null, 2)},
      nodeConfigs: ${JSON.stringify(nodeConfigs, null, 2)},
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    try {
      await executeWorkflow(input)
      setInput("")
    } catch (error) {
      console.error("Error executing workflow:", error)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="${inputConfig?.placeholder || 'Enter your input...'}"
        />
        <Button type="submit">Execute</Button>
      </form>

      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="rounded-lg bg-muted p-4">
            <p className="text-sm">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}`

  // Generate the store with workflow logic
  const storeContent = `
import { create } from "zustand"
import type { Node, NodeConfig } from "@/types/actions"

interface WorkflowState {
  nodes: Node[]
  nodeConfigs: Record<string, NodeConfig>
  nodeResults: Record<string, any>
  currentNode: string | null
  error: string | null
  executing: boolean
  setNodeResult: (nodeId: string, result: any) => void
  setCurrentNode: (nodeId: string | null) => void
  setError: (error: string | null) => void
  setExecuting: (executing: boolean) => void
  executeWorkflow: (input: string) => Promise<void>
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  nodeConfigs: {},
  nodeResults: {},
  currentNode: null,
  error: null,
  executing: false,
  setNodeResult: (nodeId, result) =>
    set((state) => ({
      nodeResults: { ...state.nodeResults, [nodeId]: result },
    })),
  setCurrentNode: (nodeId) => set({ currentNode: nodeId }),
  setError: (error) => set({ error }),
  setExecuting: (executing) => set({ executing }),
  executeWorkflow: async (input: string) => {
    const { nodes, nodeConfigs } = get()
    set({ executing: true, error: null })

    try {
      for (const node of nodes) {
        set({ currentNode: node.id })
        const config = nodeConfigs[node.id]
        
        if (!config?.prompt) {
          throw new Error('No prompt configured for node')
        }

        // Process the prompt with the input
        const processedPrompt = config.prompt.replace(/\{\{\s*input\.value\s*\}\}/g, input)

        // Make the API call
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [{ role: 'user', content: processedPrompt }] }),
        })

        if (!response.ok) {
          throw new Error('Failed to execute node')
        }

        const result = await response.json()
        set((state) => ({
          nodeResults: { ...state.nodeResults, [node.id]: result },
        }))
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error occurred' })
    } finally {
      set({ executing: false, currentNode: null })
    }
  },
}))`

  // Generate the API route
  const apiRouteContent = `
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

export async function POST(req: Request) {
  const { messages } = await req.json()

  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    stream: true,
    messages,
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}`

  return {
    'page.tsx': pageContent.trim(),
    'api/chat/route.ts': apiRouteContent.trim(),
    'components/workflow.tsx': workflowContent.trim(),
    'lib/store.ts': storeContent.trim(),
  }
} 