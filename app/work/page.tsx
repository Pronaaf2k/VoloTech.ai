import Link from "next/link";
import { ProjectExamples } from "@/components/project-examples";
import { PiArrowUpRight } from "react-icons/pi";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { HeroAside } from "@/components/page-illustration";

export const metadata = {
  title: "Work | VoloTech",
  description: "Common project shapes VoloTech can design, build, connect, and support.",
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
        <ProjectExamples />
      </section>
      <section className="content-section shell"><div className="page-cta"><h2>We can shape the first version with you.</h2><Link className="button button-primary" href="/contact">Start a conversation <PiArrowUpRight aria-hidden="true" /></Link></div></section>
    </main>
    <SiteFooter />
  </>;
}
