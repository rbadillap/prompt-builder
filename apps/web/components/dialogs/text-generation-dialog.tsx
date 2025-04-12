"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { TextGenerationAction } from "@/types/actions"
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
import { Slider } from "@workspace/ui/components/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"

const providers = [
  { id: "openai", name: "GPT-4", description: "Powered by OpenAI" },
  { id: "claude", name: "Claude", description: "Powered by Anthropic" },
  { id: "grok", name: "Grok", description: "Powered by xAI" },
  { id: "mistral", name: "Mistral", description: "Open source AI model" },
] as const

const formSchema = z.object({
  provider: z.enum(providers.map(p => p.id) as [string, ...string[]]),
  prompt: z.string().min(10, {
    message: "Prompt must be at least 10 characters.",
  }),
  temperature: z.number().min(0).max(2),
})

interface TextGenerationFormData extends DialogFormData {
  content: {
    provider: string
    prompt: string
    temperature: number
  }
}

export function TextGenerationDialog({ 
  action, 
  onSubmit 
}: ActionDialogComponent<TextGenerationAction, TextGenerationFormData>) {
  const [isLoading, setIsLoading] = React.useState(false)
  const closeRef = React.useRef<HTMLButtonElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      provider: "openai",
      prompt: "",
      temperature: action.temperature ?? 0.7,
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      
      onSubmit({
        content: {
          provider: values.provider,
          prompt: values.prompt,
          temperature: values.temperature,
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
                Choose the AI model that will generate your text
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What would you like to generate?</FormLabel>
              <div className="flex flex-col gap-2">
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder="Write your prompt here..."
                      className="min-h-[150px] pr-24"
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
                Be specific about what you want to generate. Use the "Add Input" button to include the user's input.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="temperature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Creativity Level</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Slider
                    min={0}
                    max={2}
                    step={0.1}
                    value={[field.value]}
                    onValueChange={([value]) => field.onChange(value)}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>More Focused</span>
                    <span>More Creative</span>
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Adjust how creative or focused you want the response to be
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