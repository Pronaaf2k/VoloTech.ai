import Link from "next/link";
import { PiArrowUpRight, PiCheck } from "react-icons/pi";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { HeroAside } from "@/components/page-illustration";

export const metadata = {
  title: "How we work | VoloTech.ai",
  description: "A clear scope, working reviews, and a useful handover for business technology projects.",
};

const steps = [
  ["Understand the job", "We review the business problem, existing tools, users, and constraints. We identify what needs to change and what is worth keeping."],
  ["Agree on the scope", "We define deliverables, priorities, budget, dependencies, and acceptance criteria before the build starts."],
  ["Build and review", "You see working progress. We test the important user journeys, permissions, and integrations before launch."],
  ["Launch and support", "We agree on deployment, documentation, access handover, and maintenance. Ownership stays clear after delivery."],
];

const faqs = [
  ["Can you work on a system we already have?", "Yes. Tell us what it runs on, what works, and what needs attention. We review the existing setup before recommending fixes, extensions, or a rebuild."],
  ["Do we need AI or MCP for every project?", "No. A website, API integration, or straightforward automation may be all you need. MCP helps when a compatible AI application needs controlled access to your business tools or data."],
  ["Can we start with a smaller project?", "Yes. We can scope one website, feature, integration, or technical issue first. The next step depends on your priorities, budget, and what we learn."],
  ["What happens after launch?", "We agree on handover and ongoing support before delivery. Maintenance, response times, hosting costs, and responsibility for third-party services belong in that agreement."],
];

export default function HowWeWorkPage() {
  return <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <SiteHeader />
    <main id="main-content" tabIndex={-1}>
      <section className="page-hero shell" aria-labelledby="approach-title">
        <div className="page-hero-copy"><p className="eyebrow">How we work</p><h1 id="approach-title">Clear scope. Working handover.</h1><p>Good technical work includes the decisions, documentation, and support that make a system usable after launch.</p></div>
        <HeroAside kind="process"><div className="page-hero-note"><span className="meta-label">The goal</span><p>You should know what is being built, why it matters, what it costs, and who owns it when the work is done.</p></div></HeroAside>
      </section>
      <section className="content-section shell" aria-labelledby="process-title">
        <p className="eyebrow">The process</p>
        <h2 id="process-title">A few steps, in the right order.</h2>
        <ol className="process-list">{steps.map(([title, copy]) => <li key={title}><h3>{title}</h3><p>{copy}</p></li>)}</ol>
        <div className="working-agreement"><h3>What to clarify before we start</h3><ul>{["Who owns the code, accounts, and data", "What is included and what costs extra", "How progress and changes are reviewed", "Who handles maintenance and support"].map(item => <li key={item}><PiCheck aria-hidden="true" />{item}</li>)}</ul></div>
      </section>
      <section className="content-section shell faq" aria-labelledby="faq-title"><div><p className="eyebrow">Common questions</p><h2 id="faq-title">A few practical answers.</h2></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
      <section className="content-section shell"><div className="page-cta"><h2>Have a project in mind?</h2><Link className="button button-primary" href="/contact">Tell us what you need <PiArrowUpRight aria-hidden="true" /></Link></div></section>
    </main>
    <SiteFooter />
  </>;
}
