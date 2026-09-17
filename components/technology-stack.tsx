const groups = [
  ["Websites & applications", "React", "Next.js", "TypeScript"],
  ["Data & integrations", "Node.js", "PostgreSQL", "Python", "MCP"],
  ["Automation & delivery", "n8n", "GitHub Actions", "Docker", "Vercel"],
];
export function TechnologyStack() {
  return <section className="technology-section" aria-labelledby="technology-title"><div className="shell technology-layout"><div><p className="eyebrow">Technical capability</p><h2 id="technology-title">The right tools.<br />For your business.</h2><p className="section-intro">Chosen for the job, your existing systems, and the people who will maintain them.</p></div><div>{groups.map(([title, ...tools]) => <div className="technology-row" key={title}><h3>{title}</h3><ul>{tools.map(tool => <li key={tool}>{tool}</li>)}</ul></div>)}</div></div></section>;
}
