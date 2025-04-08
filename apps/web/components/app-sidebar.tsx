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
  ArrowRight,
  ArrowRightFromLine,
  ChevronRight,
} from "lucide-react"

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
import { ActionDialog } from "@/components/action-dialog"
import { Action } from "@/types/actions"

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
      id: "text-generation",
      type: "text",
      title: "Generate Text",
      description: "Generate text based on your input",
      input: [],
      output: "text",
      icon: TextQuoteIcon,
      tags: ["create", "assistant"],
      provider: "openai",
      maxLength: 4000,
      temperature: 0.7
    },
    {
      id: "image-generation",
      type: "image",
      title: "Generate Images",
      description: "Create images by describing what you want to see",
      input: ["text"],
      output: "image",
      icon: ImageIcon,
      tags: ["images", "art"],
      provider: "stability",
      sizes: [
        { width: 512, height: 512, label: "Square" },
        { width: 768, height: 512, label: "Landscape" },
        { width: 512, height: 768, label: "Portrait" }
      ]
    },
    {
      id: "text-to-speech",
      type: "speech",
      title: "Text to Speech",
      description: "Convert your text into natural-sounding speech",
      input: ["text"],
      output: "audio",
      icon: MusicIcon,
      tags: ["audio", "voice"],
      provider: "google",
      voices: [
        { id: "en-US-1", name: "English US Female" },
        { id: "en-US-2", name: "English US Male" }
      ]
    },
    {
      id: "translate",
      type: "translation",
      title: "Translate Languages",
      description: "Translate text between any languages naturally",
      icon: LandPlot,
      tags: ["translate", "language"],
      provider: "google",
      input: ["text"],
      output: "text",
      supportedLanguages: ["en", "es", "fr", "de", "it", "pt", "ru", "zh", "ja", "ko"]
    },
    {
      id: "content-writing",
      type: "content",
      title: "Write Content",
      description: "Get help writing articles, emails, or any type of content",
      icon: FileText,
      tags: ["write", "content"],
      provider: "anthropic",
      input: ["text"],
      output: "text",
      templates: [
        { id: "blog", name: "Blog Post", description: "Write a blog post" },
        { id: "email", name: "Email", description: "Write a professional email" }
      ]
    },
    {
      id: "chat-analyze",
      type: "chat",
      title: "Chat & Analyze",
      description: "Have conversations and get insights from your data",
      icon: MessageSquarePlus,
      tags: ["chat", "analyze"],
      provider: "openai",
      input: ["text"],
      output: "text",
      features: [
        { id: "chat", name: "Chat", description: "Have a conversation" },
        { id: "analyze", name: "Analyze", description: "Analyze data" }
      ]
    },
    {
      id: "improve-writing",
      type: "improvement",
      title: "Improve Writing",
      description: "Make your text more clear, engaging, and professional",
      icon: Sparkles,
      tags: ["improve", "edit"],
      provider: "anthropic",
      input: ["text"],
      output: "text",
      modes: [
        { id: "clarity", name: "Clarity", description: "Improve clarity" },
        { id: "tone", name: "Tone", description: "Adjust tone" }
      ]
    },
    {
      id: "summarize",
      type: "summary",
      title: "Summarize Text",
      description: "Get the key points from any text quickly",
      icon: TextQuoteIcon,
      tags: ["summary", "extract"],
      provider: "anthropic",
      input: ["text"],
      output: "text",
      maxLength: 1000
    }
  ] as Action[],
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
              <span>Developer Mode</span>
              <Switch className="shadow-none" />
            </Label> */}
          </div>
          <SidebarInput placeholder="What are you going to build?" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {actions.map((action) => (
                <ActionDialog key={action.id} action={action}>
                  <a
                    href="#"
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
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-foreground transition-opacity group-hover:opacity-100">
                      <ChevronRight className="size-4" />
                    </div>
                  </a>
                </ActionDialog>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
