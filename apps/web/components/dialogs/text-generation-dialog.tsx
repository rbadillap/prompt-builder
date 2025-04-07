"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { TextGenerationAction } from "@/types/actions"
import { Button } from "@workspace/ui/components/button"
import { DialogFooter } from "@workspace/ui/components/dialog"
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

const formSchema = z.object({
  prompt: z.string().min(10, {
    message: "Prompt must be at least 10 characters.",
  }),
  temperature: z.number().min(0).max(2),
})

type FormValues = z.infer<typeof formSchema>

interface TextGenerationDialogProps {
  action: TextGenerationAction
}

export function TextGenerationDialog({ action }: TextGenerationDialogProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      temperature: action.temperature ?? 0.7,
    },
  })

  async function onSubmit(values: FormValues) {
    try {
      setIsLoading(true)
      console.log("Submitting text generation:", values)
      // Here we'll handle the actual API call to the LLM provider
    } catch (error) {
      console.error("Error generating text:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your prompt here..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Be specific about what you want to generate.
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
              <FormLabel>Temperature</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={2}
                  step={0.1}
                  value={[field.value]}
                  onValueChange={([value]) => field.onChange(value)}
                />
              </FormControl>
              <FormDescription>
                Higher values make the output more creative but less predictable.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
} 