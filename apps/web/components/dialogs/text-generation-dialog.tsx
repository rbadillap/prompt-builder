"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { TextGenerationAction } from "@/types/actions"
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
import { useBuilder } from "@/components/builder/context"
import { Text, TextIcon } from "lucide-react"

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
  const { addNode } = useBuilder()
  const closeRef = React.useRef<HTMLButtonElement>(null)

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
      
      // Add node to the builder
      addNode({
        type: 'text-generation',
        label: 'Text Generation',
        icon: TextIcon,
        content: JSON.stringify({
          prompt: values.prompt,
          temperature: values.temperature,
        }),
      })

      // Close the dialog using the ref
      closeRef.current?.click()

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