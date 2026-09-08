import type { Metadata, Viewport } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://volotech.ai"),
  title: "VoloTech.ai | Your business. In full flow.",
  description: "AI agents, MCP integrations, and connected workflows for businesses in Bangladesh. Connect your tools, move work forward, and keep your people in control.",
  openGraph: { title: "VoloTech.ai | Your business. In full flow.", description: "AI agents and connected workflows built around the tools your team already uses.", type: "website", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "VoloTech.ai. Your business. In full flow." }] },
  twitter: { card: "summary_large_image", title: "VoloTech.ai | Your business. In full flow.", description: "AI agents and connected workflows built around the tools your team already uses.", images: ["/og-image.png"] },
  icons: { icon: "/volo-mark.webp", shortcut: "/volo-mark.webp", apple: "/volo-mark.webp" },
};
export const viewport: Viewport = { themeColor: "#111110" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

