import { useChat } from '@ai-sdk/react'
import { type ExecutionResult } from '@/store/workflow-store'
import { type DialogFormData } from '@/types/dialogs'

// Helper to process input variables in prompts
function processTemplate(template: string, inputs: ExecutionResult[]) {
  return template.replace(/\{\{\s*input\.value\s*\}\}/g, () => {
    const input = inputs[0] // For now, just use the first input
    return input?.value || ''
  })
}

export function useChatExecution() {
  const { messages, append, setMessages } = useChat()

  const executeChat = async (
    config: DialogFormData['content'],
    inputs: ExecutionResult[]
  ): Promise<ExecutionResult> => {
    try {
      // Process the template if it exists in the config
      const processedPrompt = config.prompt ? processTemplate(config.prompt, inputs) : ''

      // Append the user message and get the response
      const response = await append({
        role: 'user',
        content: processedPrompt,
      })

      // Get the last message which should be the assistant's response
      const lastMessage = messages[messages.length - 1]

      // If we have parts, process them
      if (lastMessage?.parts?.length) {
        // For now, we'll concatenate all text parts
        // In the future, we can handle different part types differently
        const textContent = lastMessage.parts
          .filter(part => part.type === 'text')
          .map(part => (part as { text: string }).text)
          .join('\n')

        return {
          type: 'text',
          value: textContent
        }
      }

      // Fallback to using the content directly
      return {
        type: 'text',
        value: response || ''
      }
    } catch (error) {
      console.error('Chat execution failed:', error)
      throw error
    }
  }

  const reset = () => {
    setMessages([])
  }

  return {
    executeChat,
    reset,
    messages
  }
} 