
import '@/styles/globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Inter } from "next/font/google"
import type { Metadata } from "next"

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Pitch, Please',
  description: 'Corporate Project Management Simulator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        <TooltipProvider>
          <main>{children}</main>
          <Toaster />
          <Sonner position="top-right" />
        </TooltipProvider>
      </body>
    </html>
  )
}
