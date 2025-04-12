import { type Action, type PrimitiveNodeType } from '@/types/actions'
import { type DialogFormData } from '@/types/dialogs'
import { type ExecutionResult } from '@/store/workflow-store'

async function callAiEndpoint(
  type: Action['type'],
  config: DialogFormData['content'],
  inputs: ExecutionResult[]
): Promise<Response> {
  console.log('🌐 Calling AI endpoint:', {
    type,
    config,
    inputs
  })

  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type,
      config,
      inputs,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    console.error('🔥 AI endpoint error:', error)
    throw new Error(error.message || 'AI request failed')
  }

  console.log('✅ AI endpoint response received')
  return response
}

// Helper to process input variables in prompts
function processTemplate(template: string, inputs: ExecutionResult[]) {
  return template.replace(/\{\{\s*input\.value\s*\}\}/g, () => {
    const input = inputs[0] // For now, just use the first input
    return input?.value || ''
  })
}

export async function executeAction(
  type: Action['type'],
  config: DialogFormData['content'],
  inputs: ExecutionResult[]
): Promise<ExecutionResult> {
  console.log('🎬 Starting action execution:', { type })
  
  try {
    const response = await callAiEndpoint(type, config, inputs)

    // Handle streaming text responses
    if (type === 'text') {
      console.log('📝 Processing streaming text response...')
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let result = ''

      if (!reader) {
        throw new Error('No response body')
      }

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        result += chunk
        console.log('📨 Received text chunk:', chunk)
      }

      console.log('📄 Text stream complete')
      return {
        type: 'text',
        value: result
      }
    }

    // Handle other response types
    console.log('📦 Processing regular response...')
    const result = await response.json()
    console.log('✨ Action execution complete:', result)
    return result as ExecutionResult
  } catch (error) {
    console.error('💥 Action execution failed:', error)
    throw error
  }
} 