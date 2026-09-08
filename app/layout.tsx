import type { Metadata, Viewport } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://volotechai.vercel.app";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "VoloTech.ai | AI workflows that move",
  description: "AI agents and connected workflows for businesses in Bangladesh. Connect your tools, move work forward, and keep people in control.",
  openGraph: { title: "VoloTech.ai | AI workflows that move", siteName: "VoloTech.ai", description: "Connected AI workflows for the tools your team already uses.", type: "website", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "VoloTech.ai. AI workflows that move." }] },
  twitter: { card: "summary_large_image", title: "VoloTech.ai | AI workflows that move", description: "Connected AI workflows for tools your team already uses.", images: ["/og-image.png"] },
  icons: { icon: "/volo-mark.webp", shortcut: "/volo-mark.webp", apple: "/volo-mark.webp" },
  alternates: { canonical: siteUrl },
};
export const viewport: Viewport = { themeColor: "#111110" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

