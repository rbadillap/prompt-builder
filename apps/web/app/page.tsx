import { AppSidebar } from "@/components/app-sidebar"
import { NavActions } from "@/components/nav-actions"
import { Builder } from "@/components/builder"
import { UserInputActionDialog } from "@/components/dialogs/user-input-action-dialog"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"
import { Separator } from "@workspace/ui/components/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your AI</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Prompt</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">
          <UserInputActionDialog>
            <div className="mx-auto h-24 w-full max-w-3xl rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/20 hover:bg-muted/30 hover:border-muted-foreground/40 transition-colors cursor-pointer flex flex-col items-center justify-center group">
              <p className="text-muted-foreground group-hover:text-foreground transition-colors">Define user input</p>
              <p className="text-xs text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">Click here to configure what information you need from users</p>
            </div>
          </UserInputActionDialog>
          <div className="mx-auto h-[calc(100vh-16rem)] w-full max-w-3xl rounded-xl bg-muted/50 overflow-hidden">
            <Builder />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
