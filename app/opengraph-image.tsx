import { ImageResponse } from "next/og";
export const alt = "VoloTech.ai. We help businesses build and run the technology they need.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#f7f6f2", color: "#252622", padding: 70 }}><div style={{ display: "flex", fontSize: 36, color: "#a83d17" }}>VoloTech.ai</div><div style={{ fontSize: 64, lineHeight: 1.15, letterSpacing: -2 }}>We help businesses build and run the technology they need.</div><div style={{ fontSize: 25, color: "#5d6058" }}>Websites · Software · Integrations · Technical support</div></div>, size);
}
