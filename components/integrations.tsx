import { siClaude, siOdoo, siHubspot, siN8n, siGoogledrive, siWhatsapp } from "simple-icons";
const tools = [siClaude, siOdoo, siHubspot, siN8n, siGoogledrive, siWhatsapp];
export function Integrations() {
  return <section className="integrations shell" aria-label="Business tool integrations"><p>Built around the tools<br /><span>you already work with.</span></p><div className="integration-logos">{tools.map(tool => <div className="integration-logo" key={tool.slug}><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={tool.path} /></svg><span>{tool.title}</span></div>)}</div></section>;
}
