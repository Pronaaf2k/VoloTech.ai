import {
  siAirtable,
  siAsana,
  siClaude,
  siClickup,
  siGithubcopilot,
  siGoogledrive,
  siGooglegemini,
  siHubspot,
  siIntercom,
  siLangchain,
  siMake,
  siMistralai,
  siN8n,
  siOdoo,
  siOpenrouter,
  siWhatsapp,
  siZapier,
  siZendesk,
  siZoho,
} from "simple-icons";
import { FaSalesforce, FaSlack } from "react-icons/fa6";
import { PiOpenAiLogo } from "react-icons/pi";
import type { IconType } from "react-icons";

type Tool = { label: string; color: string; path?: string; Icon?: IconType };
const simpleTool = (icon: { hex: string; path: string }, label: string): Tool => ({ label, color: `#${icon.hex}`, path: icon.path });

const aiTools: Tool[] = [
  { label: "OpenAI", color: "#111111", Icon: PiOpenAiLogo }, simpleTool(siClaude, "Claude"),
  simpleTool(siGooglegemini, "Gemini"), simpleTool(siGithubcopilot, "GitHub Copilot"),
  simpleTool(siMistralai, "Mistral AI"), simpleTool(siOpenrouter, "OpenRouter"),
  simpleTool(siLangchain, "LangChain"), simpleTool(siN8n, "n8n"),
  simpleTool(siZapier, "Zapier"), simpleTool(siMake, "Make"),
];

const businessTools: Tool[] = [
  { label: "Salesforce", color: "#00A1E0", Icon: FaSalesforce }, simpleTool(siHubspot, "HubSpot"),
  { label: "Slack", color: "#4A154B", Icon: FaSlack }, simpleTool(siZoho, "Zoho"),
  simpleTool(siOdoo, "Odoo"), simpleTool(siAirtable, "Airtable"),
  simpleTool(siIntercom, "Intercom"), simpleTool(siZendesk, "Zendesk"),
  simpleTool(siClickup, "ClickUp"), simpleTool(siAsana, "Asana"),
  simpleTool(siWhatsapp, "WhatsApp"), simpleTool(siGoogledrive, "Google Drive"),
];

function ToolPill({ tool }: { tool: Tool }) {
  const { Icon } = tool;
  return (
    <span className="tool-pill">
      <span className="tool-logo" style={{ color: tool.color }}>{Icon ? <Icon aria-hidden="true" /> : <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={tool.path} /></svg>}</span>
      <strong>{tool.label}</strong>
    </span>
  );
}

function MarqueeRow({ tools, reverse = false, label }: { tools: readonly Tool[]; reverse?: boolean; label: string }) {
  return (
    <div className={`tool-marquee ${reverse ? "reverse" : ""}`} aria-label={label}>
      <div className="marquee-track">
        <div className="marquee-group">{tools.map((tool) => <ToolPill tool={tool} key={tool.label} />)}</div>
        <div className="marquee-group" aria-hidden="true">{tools.map((tool) => <ToolPill tool={tool} key={`duplicate-${tool.label}`} />)}</div>
      </div>
    </div>
  );
}

export function ToolMarquees() {
  return (
    <section className="tool-marquees" aria-labelledby="tool-marquee-heading">
      <div className="marquee-heading"><p id="tool-marquee-heading">Connect leading AI, automation, and CRM tools</p><span>Hover to pause</span></div>
      <MarqueeRow tools={aiTools} label="AI and automation tools" />
      <MarqueeRow tools={businessTools} reverse label="CRM and business tools" />
    </section>
  );
}
