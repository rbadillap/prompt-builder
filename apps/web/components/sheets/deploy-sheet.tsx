import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@workspace/ui/components/sheet"
import { Button } from "@workspace/ui/components/button"
import { useWorkflowStore } from "@/store/workflow-store"
import { useInputStore } from "@/store/input-store"
import { Download, Loader2 } from "lucide-react"
import { generateDeploymentFiles } from "@/lib/deployment-generator"
import { cn } from "@workspace/ui/lib/utils"
import JSZip from "jszip"

interface DeploySheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeploySheet({ open, onOpenChange }: DeploySheetProps) {
  const [isGenerating, setIsGenerating] = React.useState(false)
  const { nodes, nodeConfigs } = useWorkflowStore()
  const { config: inputConfig } = useInputStore()

  const handleGenerate = async () => {
    try {
      setIsGenerating(true)
      
      const deploymentConfig = {
        nodes,
        nodeConfigs,
        inputConfig,
      }

      const files = await generateDeploymentFiles(deploymentConfig)
      
      // Create a zip file with the generated files
      const zip = new JSZip()
      
      // Add files to zip
      Object.entries(files).forEach(([path, content]) => {
        zip.file(path, content)
      })
      
      // Generate zip and create download
      const blob = await zip.generateAsync({ 
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
          level: 9
        }
      })
      
      // Create download link
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'workflow-deployment.zip'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error generating deployment files:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[500px]">
        <div className="space-y-6 px-2">
          <SheetHeader>
            <SheetTitle>Generate Deployment</SheetTitle>
            <SheetDescription>
              Generate a deployable version of your workflow
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4">
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                This will generate a complete Next.js application with:
              </p>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground list-disc list-inside">
                <li>React Server Components for optimal performance</li>
                <li>API routes for workflow execution</li>
                <li>Pre-configured workflow state</li>
                <li>Ready to deploy UI components</li>
              </ul>
            </div>
          </div>

          <SheetFooter className="flex sm:justify-between">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={cn(
                "gap-2",
                isGenerating && "cursor-not-allowed opacity-60"
              )}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Generate Files
                </>
              )}
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
} 