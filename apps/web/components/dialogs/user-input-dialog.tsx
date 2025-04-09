"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Lock } from "lucide-react"
import * as z from "zod"

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
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"

const formSchema = z.object({
  label: z.string().min(2, {
    message: "Label must be at least 2 characters.",
  }),
  placeholder: z.string().min(2, {
    message: "Placeholder must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
})

interface UserInputFormData {
  content: {
    label: string
    placeholder: string
    description: string
  }
}

export function UserInputDialog({ 
  onSubmit 
}: { 
  onSubmit: (data: UserInputFormData) => void 
}) {
  const [isLoading, setIsLoading] = React.useState(false)
  const closeRef = React.useRef<HTMLButtonElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      placeholder: "",
      description: "",
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      
      onSubmit({
        content: {
          label: values.label,
          placeholder: values.placeholder,
          description: values.description,
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
    <Tabs defaultValue="text" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="text">Text Input</TabsTrigger>
        <TabsTrigger value="image" disabled className="flex items-center gap-2">
          Image Input <Lock className="h-3 w-3" />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="text">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Animal Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The label that will be shown above the input field
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="placeholder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placeholder</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Enter an animal name..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Helper text that appears inside the input field
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="e.g., Enter the name of an animal you'd like to create a logo for. Keep it simple and specific."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Detailed instructions for the user about what to input
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
                {isLoading ? "Saving..." : "Save Configuration"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="image" className="flex flex-col items-center justify-center py-6 text-center">
        <Lock className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">Image input configuration is coming soon</p>
      </TabsContent>
    </Tabs>
  )
} 