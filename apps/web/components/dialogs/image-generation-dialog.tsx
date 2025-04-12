"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ImageGenerationAction } from "@/types/actions"
import { type DialogFormData, type ActionDialogComponent } from "@/types/dialogs"
import { Button } from "@workspace/ui/components/button"
import { DialogFooter, DialogClose } from "@workspace/ui/components/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form"
import { Textarea } from "@workspace/ui/components/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import { Slider } from "@workspace/ui/components/slider"

const providers = [
  { id: "stability", name: "Stability AI", description: "Powered by SDXL" },
  { id: "openai", name: "DALL-E 3", description: "By OpenAI" },
  { id: "midjourney", name: "Midjourney", description: "High quality AI art" },
  { id: "leonardo", name: "Leonardo AI", description: "Specialized in creative art" },
] as const

const sizes = [
  { id: "square", width: 1024, height: 1024, label: "Square (1024×1024)" },
  { id: "portrait", width: 1024, height: 1408, label: "Portrait (1024×1408)" },
  { id: "landscape", width: 1408, height: 1024, label: "Landscape (1408×1024)" },
] as const

const formSchema = z.object({
  provider: z.enum(providers.map(p => p.id) as [string, ...string[]]),
  prompt: z.string().min(10, {
    message: "Prompt must be at least 10 characters.",
  }),
  negativePrompt: z.string().optional(),
  size: z.enum(sizes.map(s => s.id) as [string, ...string[]]),
  steps: z.number().min(20).max(150),
})

interface ImageGenerationFormData extends DialogFormData {
  content: {
    provider: string
    prompt: string
    negativePrompt?: string
    size: string
    steps: number
  }
}

export function ImageGenerationDialog({ 
  action, 
  onSubmit 
}: ActionDialogComponent<ImageGenerationAction, ImageGenerationFormData>) {
  const [isLoading, setIsLoading] = React.useState(false)
  const closeRef = React.useRef<HTMLButtonElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      provider: "stability",
      prompt: "",
      negativePrompt: "",
      size: "square",
      steps: 50,
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      
      onSubmit({
        content: {
          provider: values.provider,
          prompt: values.prompt,
          negativePrompt: values.negativePrompt,
          size: values.size,
          steps: values.steps,
        }
      })

      closeRef.current?.click()
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="provider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AI Provider</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a provider" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {providers.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the AI model that will generate your image
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Describe your image</FormLabel>
              <div className="flex flex-col gap-2">
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder="Describe what you want to see in detail..."
                      className="min-h-[100px] pr-24"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="absolute right-2 top-2"
                      onClick={(e) => {
                        e.preventDefault()
                        const textarea = e.currentTarget.parentElement?.querySelector('textarea')
                        if (textarea) {
                          const start = textarea.selectionStart
                          const end = textarea.selectionEnd
                          const value = textarea.value
                          const newValue = value.substring(0, start) + "{{ input.value }}" + value.substring(end)
                          field.onChange(newValue)
                          // Set cursor position after the inserted text
                          setTimeout(() => {
                            textarea.focus()
                            const newPosition = start + "{{ input.value }}".length
                            textarea.setSelectionRange(newPosition, newPosition)
                          }, 0)
                        }
                      }}
                    >
                      Add Input
                    </Button>
                  </div>
                </FormControl>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Available Variables:</span>
                  <code className="rounded bg-muted px-1 py-0.5">{"{{ input.value }}"}</code>
                </div>
              </div>
              <FormDescription>
                Be specific about style, colors, composition, and details. Use the "Add Input" button to include the user's input.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="negativePrompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What to avoid (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe what you don't want to see..."
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Specify elements you want to exclude from the image
              </FormDescription>
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select image size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sizes.map((size) => (
                    <SelectItem key={size.id} value={size.id}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the dimensions of your generated image
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="steps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quality Level</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Slider
                    min={20}
                    max={150}
                    step={1}
                    value={[field.value]}
                    onValueChange={([value]) => field.onChange(value)}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Faster</span>
                    <span>Higher Quality</span>
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                More steps generally means higher quality but takes longer to generate
              </FormDescription>
            </FormItem>
          )}
        />

        <DialogFooter>
          <DialogClose ref={closeRef} className="hidden" />
          <Button variant="outline" type="button" onClick={() => closeRef.current?.click()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
} 