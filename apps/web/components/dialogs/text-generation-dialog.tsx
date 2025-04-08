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

const formSchema = z.object({
  prompt: z.string().min(10, {
    message: "Prompt must be at least 10 characters.",
  }),
  temperature: z.number().min(0).max(2),
})

interface TextGenerationFormData extends DialogFormData {
  content: {
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
      prompt: "",
      temperature: action.temperature ?? 0.7,
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      
      // Just pass the form data to the parent
      onSubmit({
        content: {
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