import * as React from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@workspace/ui/components/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@workspace/ui/components/sheet"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { useWorkflowStore } from "@/store/workflow-store"
import { AlertCircle, User, Bot } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { type PrimitiveNodeType } from "@/types/actions"
import { type ExecutionResult } from "@/store/workflow-store"

interface WorkflowSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function processTemplateVariables(template: string, inputs: ExecutionResult[]): string {
  let processedTemplate = template

  if (inputs.length > 0 && inputs[0]?.value !== undefined) {
    const inputValue = inputs[0].value
    processedTemplate = processedTemplate.replace(/\{\{\s*input\.value\s*\}\}/g, inputValue)
  }

  return processedTemplate
}

function ResultSkeleton({ type }: { type: PrimitiveNodeType }) {
  switch (type) {
    case "text":
      return (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[60%]" />
          <Skeleton className="h-4 w-[70%]" />
        </div>
      )
    case "image":
      return (
        <div className="space-y-2">
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-4 w-[50%]" />
        </div>
      )
    case "audio":
      return (
        <div className="space-y-2">
          <Skeleton className="h-12 w-full rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 flex-1" />
          </div>
        </div>
      )
    default:
      return <Skeleton className="h-16 w-full" />
  }
}

function ChatMessage({ message }: { message: any }) {
  const isUser = message.role === "user"
  
  return (
    <div className={cn(
      "flex gap-3 mb-4",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <div className={cn(
        "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className={cn(
        "flex-1 space-y-2 overflow-hidden rounded-lg px-4 py-3",
        isUser ? "bg-primary/10" : "bg-muted"
      )}>
        <p className="text-sm leading-normal">
          {message.content}
        </p>
      </div>
    </div>
  )
}

function ResultContent({ 
  type, 
  nodeId, 
  messages 
}: { 
  type: PrimitiveNodeType; 
  nodeId: string;
  messages: any[];
}) {
  const { nodeResults } = useWorkflowStore()
  const result = nodeResults[nodeId]

  if (!result) {
    return <ResultSkeleton type={type} />
  }

  switch (type) {
    case "text":
      return (
        <div className="space-y-4">
          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          ) : (
            <div className="whitespace-pre-wrap text-sm">
              {result.value}
            </div>
          )}
        </div>
      )
    case "image":
      return (
        <div className="space-y-2">
          <img src={result.value} alt="Generated" className="w-full rounded-lg" />
        </div>
      )
    case "audio":
      return (
        <div className="space-y-2">
          <audio src={result.value} controls className="w-full" />
        </div>
      )
    default:
      return <div className="text-sm">{result.value}</div>
  }
}

export function WorkflowSheet({ open, onOpenChange }: WorkflowSheetProps) {
  const { nodes, nodeConfigs, setNodeResult, error, setError, getNodeInputs } = useWorkflowStore()
  const { messages, data, append, setMessages, isLoading } = useChat()
  const [currentNodeId, setCurrentNodeId] = React.useState<string | null>(null)
  const hasNodes = nodes.length > 0

  const executeNode = React.useCallback(async (node: typeof nodes[0]) => {
    try {
      setCurrentNodeId(node.id)
      const config = nodeConfigs[node.id]
      
      if (!config?.prompt) {
        throw new Error('No prompt configured for node')
      }

      // Get input values from connected nodes and process template
      const inputs = getNodeInputs(node.id)
      const processedPrompt = processTemplateVariables(config.prompt, inputs)

      const response = await append({
        role: 'user',
        content: processedPrompt,
      })

      const result: ExecutionResult = {
        type: node.data.type as PrimitiveNodeType,
        value: response || ''
      }

      setNodeResult(node.id, result)
      return true
    } catch (error) {
      console.error(`Error executing node ${node.id}:`, error)
      setError(error instanceof Error ? error.message : 'Unknown error occurred')
      return false
    }
  }, [nodeConfigs, setNodeResult, setError, append, getNodeInputs])

  React.useEffect(() => {
    if (open && hasNodes) {
      setMessages([]) // Reset chat messages
      setError(null)
      
      // Execute nodes in sequence
      const executeNodes = async () => {
        for (const node of nodes) {
          const success = await executeNode(node)
          if (!success) break
        }
        setCurrentNodeId(null)
      }

      executeNodes()
    }
  }, [open, hasNodes, nodes, setMessages, setError, executeNode])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[500px]">
        <div className="space-y-6 px-2">
          <SheetHeader>
            <SheetTitle>Workflow Execution</SheetTitle>
            <SheetDescription>
              {!hasNodes 
                ? "No workflow found"
                : isLoading 
                  ? "Your workflow is being executed..."
                  : error 
                    ? "An error occurred during execution"
                    : "Workflow execution completed"}
            </SheetDescription>
          </SheetHeader>

          {!hasNodes ? (
            <div className="flex flex-col items-center justify-center gap-4 py-8">
              <AlertCircle className="h-12 w-12 text-muted-foreground" strokeWidth={1.5} />
              <div className="text-center space-y-2">
                <p className="text-lg font-medium">Empty Workflow</p>
                <p className="text-sm text-muted-foreground max-w-[380px]">
                  There are no nodes in your workflow. Add some nodes to the builder before running the workflow.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-4 text-sm text-destructive bg-destructive/10 rounded-lg">
                  <AlertCircle className="h-4 w-4" />
                  <p>{error}</p>
                </div>
              )}
              {nodes.map((node) => (
                <div 
                  key={node.id}
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-lg",
                    currentNodeId === node.id ? "bg-primary/10" : "bg-muted/50"
                  )}
                >
                  <div className="space-y-2 flex-1">
                    <p className="font-medium">{node.data.label}</p>
                    <div className="rounded-md bg-background p-3">
                      <ResultContent 
                        type={node.data.type as PrimitiveNodeType} 
                        nodeId={node.id}
                        messages={messages}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <SheetFooter>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
              disabled={isLoading}
            >
              {isLoading ? "Executing..." : "Close"}
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
} 