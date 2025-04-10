import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@workspace/ui/components/sheet"
import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"
import { useInputStore } from "@/store/input-store"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { cn } from "@workspace/ui/lib/utils"

interface FormValues {
  input: string
}

interface WorkflowSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WorkflowSheet({ open, onOpenChange }: WorkflowSheetProps) {
  const config = useInputStore((state) => state.config)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log(data)
    // Here you would handle the workflow execution
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-2">
          <SheetHeader>
            <SheetTitle>Workflow Execution</SheetTitle>
            <SheetDescription>
              Configure and execute your workflow
            </SheetDescription>
          </SheetHeader>

          {config ? (
            <div className="grid gap-4 p-4">
              <div className="grid gap-2">
                <Label htmlFor="input" className={cn(errors.input && "text-destructive")}>
                  {config.label}
                </Label>
                <Input
                  id="input"
                  {...register("input", { 
                    required: "This field is required" 
                  })}
                  placeholder={config.placeholder}
                  className={cn(errors.input && "border-destructive")}
                />
                {errors.input ? (
                  <p className="text-sm text-destructive">{errors.input.message}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {config.description}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-8">
              <CheckCircle2 className="h-12 w-12 text-primary" strokeWidth={1.5} />
              <div className="text-center space-y-2">
                <p className="text-lg font-medium">No Input Required</p>
                <p className="text-sm text-muted-foreground max-w-[380px]">
                  This workflow is ready to run without any additional input. Click continue to execute it.
                </p>
              </div>
            </div>
          )}

          <SheetFooter>
            <Button type="submit" className="w-full sm:w-auto">
              {config ? "Execute Workflow" : "Continue"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
} 