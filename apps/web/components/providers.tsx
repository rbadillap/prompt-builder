"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ReactFlowProvider } from 'reactflow'
import { BuilderProvider } from "@/components/builder/context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <ReactFlowProvider>
        <BuilderProvider>
          {children}
        </BuilderProvider>
      </ReactFlowProvider>
    </NextThemesProvider>
  )
}
