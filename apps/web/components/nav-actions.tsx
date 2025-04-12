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
import { InputSheet } from "./sheets/input-sheet"
import { WorkflowSheet } from "./sheets/workflow-sheet"
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

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isInputSheetOpen, setIsInputSheetOpen] = React.useState(false)
  const [isWorkflowSheetOpen, setIsWorkflowSheetOpen] = React.useState(false)
  const { setExecuting, setCurrentNode } = useWorkflowStore()

  const handleWorkflowStart = () => {
    setIsInputSheetOpen(false)
    setIsWorkflowSheetOpen(true)
    setExecuting(true)
    // Start with the first node
    // You might want to adjust this logic based on your workflow structure
    setCurrentNode(null) // Reset current node
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="hidden font-medium text-muted-foreground md:inline-block">
        Last edited 10 Apr
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7"
              onClick={() => setIsInputSheetOpen(true)}
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
              <Star />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Star</p>
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
        onSubmit={handleWorkflowStart}
      />
      <WorkflowSheet 
        open={isWorkflowSheetOpen} 
        onOpenChange={setIsWorkflowSheetOpen}
      />
    </div>
  )
}
