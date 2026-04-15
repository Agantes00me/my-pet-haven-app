import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from "./components/theme-provider"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ChatBot from "./components/ChatBot"
import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Adding forcedTheme="light" tells the provider to ignore the browser completely
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-primary/30 min-h-screen flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light" // <-- ADD THIS LINE
          enableSystem={false}
        >
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ChatBot />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}