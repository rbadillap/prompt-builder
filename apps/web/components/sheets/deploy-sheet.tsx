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
import { Rocket, Loader2 } from "lucide-react"
import { generateDeploymentFiles, type DeploymentConfig } from "@/lib/deployment-generator"
import { cn } from "@workspace/ui/lib/utils"
import JSZip from "jszip"
import { toast } from "sonner"

interface DeploySheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeploySheet({ open, onOpenChange }: DeploySheetProps) {
  const [isDeploying, setIsDeploying] = React.useState(false)
  const { nodes, nodeConfigs } = useWorkflowStore()
  const { config: inputConfig } = useInputStore()

  const handleDeploy = async () => {
    try {
      setIsDeploying(true)
      
      const deploymentConfig: DeploymentConfig = {
        nodes,
        nodeConfigs,
        inputConfig: inputConfig ?? undefined,
      }

      const files = await generateDeploymentFiles(deploymentConfig)
      
      // Create a zip file with the generated files
      const zip = new JSZip()
      
      // Add files to zip
      Object.entries(files).forEach(([path, content]) => {
        zip.file(path, content)
      })
      
      // Generate zip blob
      const blob = await zip.generateAsync({ 
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
          level: 9
        }
      })

      // Create FormData with the zip file
      const formData = new FormData()
      formData.append('file', new File([blob], 'workflow-deployment.tgz', { type: 'application/gzip' }))
      
      // Send to our API endpoint
      const response = await fetch('/api/deploy', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Deployment failed')
      }

      const data = await response.json()
      
      // Show success message with deployment URL and status
      toast.success("Deployment Initiated", {
        description: (
          <div className="flex flex-col gap-2">
            <p>Your workflow deployment has been queued successfully!</p>
            <div className="flex flex-col text-sm text-muted-foreground">
              <p>Status: {data.deployment.status}</p>
              <p>Project: {data.deployment.project.name}</p>
            </div>
            <a 
              href={data.deployment.inspectorUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              View Deployment Status →
            </a>
          </div>
        ),
      })

      // Close the sheet
      onOpenChange(false)
    } catch (error) {
      console.error('Deployment error:', error)
      toast.error("Deployment Failed", {
        description: "There was an error deploying your workflow. Please try again.",
      })
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[500px]">
        <div className="space-y-6 px-2">
          <SheetHeader>
            <SheetTitle>Deploy to Vercel</SheetTitle>
            <SheetDescription>
              Deploy your workflow as a standalone application
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4">
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your workflow will be deployed as a full-featured Next.js application with:
              </p>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground list-disc list-inside">
                <li>React Server Components for optimal performance</li>
                <li>API routes for workflow execution</li>
                <li>Pre-configured workflow state</li>
                <li>Automatic scaling and global CDN distribution</li>
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
              onClick={handleDeploy}
              disabled={isDeploying}
              className={cn(
                "gap-2",
                isDeploying && "cursor-not-allowed opacity-60"
              )}
            >
              {isDeploying ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Rocket className="h-4 w-4" />
                  Deploy to Vercel
                </>
              )}
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
} 