"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  FileText,
  Frame,
  ImageIcon,
  LandPlot,
  LifeBuoy,
  Map,
  MusicIcon,
  Pencil,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  TextQuoteIcon,
  Zap,
  Code2,
  History,
  GitFork,
  Sparkles,
  Variable,
  Wand2,
  MessageSquarePlus,
  Share2,
  BotOffIcon,
  Workflow,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar"
import { Label } from "@workspace/ui/components/label"
import { Switch } from "@workspace/ui/components/switch"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://github.com/rbadillap.png",
  },
  navMain: [
    {
      title: "Actions",
      url: "#",
      icon: Zap,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
  actions: [
    {
      title: "Generate Text",
      description: "Generate text based on your input",
      icon: TextQuoteIcon,
      shortcut: "N",
      tags: ["create", "assistant"],
    },
    {
      title: "Generate Images",
      description: "Create images by describing what you want to see",
      icon: ImageIcon,
      shortcut: "I",
      tags: ["images", "art"],
    },
    {
      title: "Text to Speech",
      description: "Convert your text into natural-sounding speech",
      icon: MusicIcon,
      shortcut: "S",
      tags: ["audio", "voice"],
    },
    {
      title: "Translate Languages",
      description: "Translate text between any languages naturally",
      icon: LandPlot,
      shortcut: "T",
      tags: ["translate", "language"],
    },
    {
      title: "Write Content",
      description: "Get help writing articles, emails, or any type of content",
      icon: FileText,
      shortcut: "W",
      tags: ["write", "content"],
    },
    {
      title: "Chat & Analyze",
      description: "Have conversations and get insights from your data",
      icon: MessageSquarePlus,
      shortcut: "C",
      tags: ["chat", "analyze"],
    },
    {
      title: "Improve Writing",
      description: "Make your text more clear, engaging, and professional",
      icon: Sparkles,
      shortcut: "E",
      tags: ["improve", "edit"],
    },
    {
      title: "Summarize Text",
      description: "Get the key points from any text quickly",
      icon: TextQuoteIcon,
      shortcut: "R",
      tags: ["summary", "extract"],
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0])
  const [actions, setActions] = React.useState(data.actions)
  const { setOpen } = useSidebar()
  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Workflow className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item)
                        const action = data.actions.sort(() => Math.random() - 0.5)
                        setActions(
                          action.slice(
                            0,
                            Math.max(5, Math.floor(Math.random() * 10) + 1)
                          )
                        )
                        setOpen(true)
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {activeItem?.title}
            </div>
            {/* <Label className="flex items-center gap-2 text-sm">
              <span>Unreads</span>
              <Switch className="shadow-none" />
            </Label> */}
          </div>
          <SidebarInput placeholder="What are you going to build?" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {actions.map((action) => (
                <a
                  href="#"
                  key={action.title}
                  className="group relative flex flex-col items-start gap-2.5 border-b p-4 text-sm transition-colors duration-150 last:border-b-0 hover:bg-muted/40"
                >
                  <div className="flex w-full items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors group-hover:text-foreground">
                      <action.icon className="size-4" />
                    </div>
                    <span className="font-medium tracking-tight">{action.title}</span>
                  </div>
                  <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs text-muted-foreground">
                    {action.description}
                  </span>
                  <kbd className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-50 group-hover:flex">
                    <Command className="size-3" /> {action.shortcut}
                  </kbd>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
