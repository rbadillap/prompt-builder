import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { type Action } from '@/types/actions'
import { type ExecutionResult } from '@/store/workflow-store'

export const runtime = 'edge'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  console.log('📨 AI endpoint received request')
  const { type, config, inputs } = await req.json()
  console.log('🔍 Request details:', { type, config, inputs })

  try {
    switch (type as Action['type']) {
      case 'text': {
        console.log('📝 Processing text generation request')
        const prompt = processTemplate(config.prompt, inputs)
        console.log('🎯 Processed prompt:', prompt)

        const result = streamText({
          model: openai('gpt-4-turbo-preview'),
          messages: [
            {
              role: 'system',
              content: prompt
            }
          ],
          temperature: config.temperature || 0.7,
        })

        return result.toDataStreamResponse()
      }

      case 'image': {
        // console.log('🎨 Processing image generation request')
        // const prompt = processTemplate(config.prompt, inputs)
        // console.log('🎯 Processed prompt:', prompt)

        // const response = await openai.image.generate({
        //   model: 'dall-e-3',
        //   prompt: prompt,
        //   n: 1,
        //   size: mapImageSize(config.size),
        //   quality: 'standard',
        //   response_format: 'url',
        // })
        // console.log('✨ OpenAI image response received')

        // if (!response.data?.[0]?.url) {
        //   throw new Error('No image URL in response')
        // }

        // return Response.json({
        //   type: 'image',
        //   value: response.data[0].url
        // } as ExecutionResult)
      }

      // Add other cases as needed...

      default:
        console.error('❌ Unsupported action type:', type)
        return Response.json(
          { error: `Unsupported action type: ${type}` },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('💥 AI request failed:', error)
    return Response.json(
      { error: 'AI request failed' },
      { status: 500 }
    )
  }
}

// Helper function to process template variables
function processTemplate(template: string, inputs: ExecutionResult[]) {
  const result = template.replace(/\{\{\s*input\.value\s*\}\}/g, () => {
    const input = inputs[0] // For now, just use the first input
    return input?.value || ''
  })
  console.log('🔄 Template processing:', { template, result })
  return result
}

// Helper function to map our size options to DALL-E sizes
function mapImageSize(size: string): '1024x1024' | '1024x1792' | '1792x1024' {
  const result = (() => {
    switch (size) {
      case 'square':
        return '1024x1024'
      case 'portrait':
        return '1024x1792'
      case 'landscape':
        return '1792x1024'
      default:
        return '1024x1024'
    }
  })()
  console.log('📐 Mapped image size:', { input: size, output: result })
  return result
} 