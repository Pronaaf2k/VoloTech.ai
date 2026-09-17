import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ChatAssistant } from "@/components/chat-assistant";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "./globals.css";
const satoshi = localFont({ src: "../public/fonts/satoshi/Satoshi-Variable.woff2", weight: "300 900", style: "normal", display: "swap", variable: "--font-satoshi" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://volotechai.vercel.app";
const title = "VoloTech | Business technology, built and supported";
const description = "We help businesses build and run the technology they need. Websites, web applications, backend systems, MCP integrations, automation, and technical support.";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), title, description,
  openGraph: { title, siteName: "VoloTech", description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
  icons: { icon: "/volo-mark.webp", shortcut: "/volo-mark.webp", apple: "/volo-mark.webp" },
  alternates: { canonical: siteUrl },
};
export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f5f1e8" }, { media: "(prefers-color-scheme: dark)", color: "#161714" }] };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem("volotech-theme");document.documentElement.dataset.theme=t==="light"||t==="dark"?t:"system"}catch(e){}})()` }} /></head><body className={satoshi.variable}>{children}<ChatAssistant /></body></html>; }
