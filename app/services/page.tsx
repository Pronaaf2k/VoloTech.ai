import Link from "next/link";
import { PiArrowRight, PiArrowUpRight, PiBrowser, PiFlowArrow, PiPlugsConnected, PiStack, PiWrench } from "react-icons/pi";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { HeroAside } from "@/components/page-illustration";

export const metadata = {
  title: "Services | VoloTech.ai",
  description: "Websites, applications, integrations, automation, and technical support for growing businesses.",
};

const services = [
  { icon: PiBrowser, title: "Websites and landing pages", summary: "A clear, fast website that helps people understand what you do and gives them an easy next step.", includes: "Business websites · Landing pages · Content management" },
  { icon: PiStack, title: "Applications and backend systems", summary: "The software behind your daily work, including customer portals, admin tools, APIs, databases, sign-in, payments, and file storage.", includes: "Web applications · APIs and databases · Customer portals" },
  { icon: PiPlugsConnected, title: "MCP development and integrations", summary: "Connect compatible AI tools to approved business data and actions, with permissions and review steps for sensitive work.", includes: "MCP servers · Tool integrations · Controlled access" },
  { icon: PiFlowArrow, title: "Automation and internal tools", summary: "Remove repeated handoffs between your CRM, email, spreadsheets, and other business software.", includes: "Workflow automation · Reporting · Internal tools" },
  { icon: PiWrench, title: "Deployment and technical support", summary: "Launch a new system, repair an existing one, or keep the technology your team relies on maintained and documented.", includes: "Deployment · Maintenance · Troubleshooting" },
];

export default function ServicesPage() {
  return <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <SiteHeader />
    <main id="main-content" tabIndex={-1}>
      <section className="page-hero shell" aria-labelledby="services-title">
        <div className="page-hero-copy"><p className="eyebrow">What we build</p><h1 id="services-title">Useful technology, sized for the job.</h1><p>Choose one piece or bring us the whole problem. We build the public-facing parts and the quieter systems that keep them running.</p></div>
        <HeroAside kind="services"><div className="page-hero-note"><span className="meta-label">Good fit</span><p>Teams that need a reliable website, a better internal workflow, or a technical partner who can stay involved after launch.</p></div></HeroAside>
      </section>
      <section className="content-section shell" aria-labelledby="offerings-title">
        <p className="eyebrow">Our services</p>
        <h2 id="offerings-title">Start with the outcome.</h2>
        <div className="service-grid">{services.map(({ icon: Icon, title, summary, includes }, index) => <article className="service-card" key={title}><div className="service-card-top"><Icon aria-hidden="true" /><span className="card-index">{String(index + 1).padStart(2, "0")}</span></div><h3>{title}</h3><p className="service-summary">{summary}</p><p className="service-includes">{includes}</p><Link className="text-link" href="/contact">Discuss this service <PiArrowUpRight aria-hidden="true" /></Link></article>)}</div>
      </section>
      <section className="content-section shell"><div className="page-cta"><h2>Have a problem that does not fit one box?</h2><Link className="button button-primary" href="/contact">Tell us about it <PiArrowRight aria-hidden="true" /></Link></div></section>
    </main>
    <SiteFooter />
  </>;
}
