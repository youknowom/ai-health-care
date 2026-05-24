//ai health doctor
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";
import "leaflet/dist/leaflet.css";
import { Analytics } from "@vercel/analytics/next";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI HEALTH CARE ASSISTANT",
  description: "AI Health Care Assistant is a platform that provides AI-powered healthcare services to users. It provides a platform for users to connect with doctors, get medical advice, and access healthcare services.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider telemetry={false}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Provider>
            {children}
            <Toaster />
            <Analytics />
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
