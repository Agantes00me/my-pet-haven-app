import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Pet Haven | Premium Pet Supplies",
  description: "Find the best for your furry friends with our premium pet shop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="//code.tidio.co/YOUR_TIDIO_KEY.js" async></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/30 text-foreground flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow bg-background">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}



