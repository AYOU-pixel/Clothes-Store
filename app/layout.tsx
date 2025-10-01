// app/layout.tsx
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer"
import { Providers } from "./Providers" // import client wrapper

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Aura Store",
  description: "Modern clothing e-commerce website",
  icons: {
    icon: "/images/aura.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100`}
      >
        {/* Client-side providers */}
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />

            {/* Main Content */}
            <main className="min-h-screen">{children}</main>

            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}




