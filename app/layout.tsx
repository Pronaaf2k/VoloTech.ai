import type { Metadata, Viewport } from "next";
import { ChatAssistant } from "@/components/chat-assistant";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/manrope/latin-800.css";
import "./globals.css";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://volotechai.vercel.app";
const title = "VoloTech.ai | Business technology, built and supported";
const description = "We help businesses build and run the technology they need. Websites, web applications, backend systems, MCP integrations, automation, and technical support.";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), title, description,
  openGraph: { title, siteName: "VoloTech.ai", description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
  icons: { icon: "/volo-mark.webp", shortcut: "/volo-mark.webp", apple: "/volo-mark.webp" },
  alternates: { canonical: siteUrl },
};
export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f7f6f2" }, { media: "(prefers-color-scheme: dark)", color: "#161714" }] };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}<ChatAssistant /></body></html>; }
