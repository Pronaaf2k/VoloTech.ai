import Link from "next/link";
import { PiArrowRight, PiArrowUpRight } from "react-icons/pi";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { HeroAside } from "@/components/page-illustration";

export const metadata = {
  title: "Work | VoloTech.ai",
  description: "Common project shapes VoloTech.ai can design, build, connect, and support.",
};

export default function WorkPage() {
  return <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <SiteHeader />
    <main id="main-content" tabIndex={-1}>
      <section className="page-hero shell" aria-labelledby="work-title">
        <div className="page-hero-copy"><p className="eyebrow">Project examples</p><h1 id="work-title">Start with the business problem.</h1><p>These are common project shapes, not promises about your exact scope. The right build depends on your users, tools, and the part that is costing you time.</p></div>
        <HeroAside kind="work"><div className="page-hero-note"><span className="meta-label">A useful brief</span><p>Tell us what people need to do, where the current process breaks, and what a better day would look like.</p></div></HeroAside>
      </section>
      <section className="content-section shell" aria-labelledby="scopes-title">
        <p className="eyebrow">Illustrative scopes</p>
        <h2 id="scopes-title">A few ways the work can take shape.</h2>
        <div className="project-grid">
          <article className="project-card project-card--feature"><span className="project-label">Customer experience</span><h3>“Our customers need a place to manage their orders.”</h3><p>A customer portal with sign-in, order history, document uploads, and an admin view for your team.</p><div className="scope-path"><span>Customer portal</span><PiArrowRight aria-hidden="true" /><span>API and database</span><PiArrowRight aria-hidden="true" /><span>Ongoing support</span></div></article>
          <div className="project-stack">
            <article className="project-card"><span className="project-label">Lead generation</span><h3>“We need a website that brings in enquiries.”</h3><p>A clear business website with service pages, an enquiry form, and delivery into your team&apos;s existing tools.</p></article>
            <article className="project-card"><span className="project-label">Operations</span><h3>“We copy the same information between tools.”</h3><p>An integration that moves data between systems, with validation, error reporting, and human approval where needed.</p></article>
          </div>
        </div>
      </section>
      <section className="content-section shell"><div className="page-cta"><h2>We can shape the first version with you.</h2><Link className="button button-primary" href="/contact">Start a conversation <PiArrowUpRight aria-hidden="true" /></Link></div></section>
    </main>
    <SiteFooter />
  </>;
}
