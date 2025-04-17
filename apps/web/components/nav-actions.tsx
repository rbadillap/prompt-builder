"use client"

import * as React from "react"
import {
  ArrowDown,
  ArrowUp,
  Bell,
  Copy,
  CornerUpLeft,
  CornerUpRight,
  FileText,
  GalleryVerticalEnd,
  LineChart,
  Link,
  MoreHorizontal,
  Settings2,
  Star,
  Trash,
  Trash2,
  Code2,
  History,
  GitFork,
  Variable,
  Wand2,
  Bot,
  MessageSquarePlus,
  Play,
  Rocket,
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
import { InputSheet } from "@/components/sheets/input-sheet"
import { WorkflowSheet } from "@/components/sheets/workflow-sheet"
import { DeploySheet } from "@/components/sheets/deploy-sheet"
import { useWorkflowStore } from "@/store/workflow-store"

const data = [
  [
    {
      label: "System Prompt",
      icon: Bot,
    },
    {
      label: "Import Variables",
      icon: Variable,
    },
    {
      label: "Function Calls",
      icon: Code2,
    },
  ],
  [
    {
      label: "Version History",
      icon: History,
    },
    {
      label: "Fork Prompt",
      icon: GitFork,
    },
    {
      label: "Format & Lint",
      icon: Wand2,
    },
  ],
  [
    {
      label: "Copy Link",
      icon: Link,
    },
    {
      label: "Duplicate",
      icon: Copy,
    },
    {
      label: "Move to",
      icon: CornerUpRight,
    },
    {
      label: "Move to Trash",
      icon: Trash2,
    },
  ],
  [
    {
      label: "Import",
      icon: ArrowUp,
    },
    {
      label: "Export",
      icon: ArrowDown,
    },
  ],
]


export function OpenInV0Button({ url }: { url: string }) {
  return (
    <svg
    viewBox="0 0 40 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-current"
    >
      <path
        d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
        fill="currentColor"
      ></path>
      <path
        d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isInputSheetOpen, setIsInputSheetOpen] = React.useState(false)
  const [isWorkflowSheetOpen, setIsWorkflowSheetOpen] = React.useState(false)
  const [isDeploySheetOpen, setIsDeploySheetOpen] = React.useState(false)
  const [inputMode, setInputMode] = React.useState<'workflow' | 'deploy'>('workflow')
  const { setExecuting, setCurrentNode } = useWorkflowStore()

  const handleWorkflowStart = () => {
    setIsInputSheetOpen(false)
    setIsWorkflowSheetOpen(true)
    setExecuting(true)
    setCurrentNode(null)
  }

  const handleDeployStart = () => {
    setIsInputSheetOpen(false)
    setIsDeploySheetOpen(true)
  }

  const handleInputSubmit = () => {
    if (inputMode === 'workflow') {
      handleWorkflowStart()
    } else {
      handleDeployStart()
    }
  }

  const openInputSheet = (mode: 'workflow' | 'deploy') => {
    setInputMode(mode)
    setIsInputSheetOpen(true)
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7"
              onClick={() => openInputSheet('workflow')}
            >
              <Play className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Run Workflow</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <OpenInV0Button url="https://v0.dev/chat/123" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open in v0</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7"
              onClick={() => openInputSheet('deploy')}
            >
              <Rocket className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Deploy to Vercel</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 data-[state=open]:bg-accent"
          >
            <MoreHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0"
          align="end"
        >
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent>
              {data.map((group, index) => (
                <SidebarGroup key={index} className="border-b last:border-none">
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                      {group.map((item, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton>
                            <item.icon /> <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>

      <InputSheet 
        open={isInputSheetOpen} 
        onOpenChange={setIsInputSheetOpen}
        onSubmit={handleInputSubmit}
      />
      <WorkflowSheet 
        open={isWorkflowSheetOpen} 
        onOpenChange={setIsWorkflowSheetOpen}
      />
      <DeploySheet
        open={isDeploySheetOpen}
        onOpenChange={setIsDeploySheetOpen}
      />
    </div>
  )
}
