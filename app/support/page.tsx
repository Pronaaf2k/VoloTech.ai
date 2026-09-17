import Link from "next/link";
import { PiArrowRight, PiBug, PiCloudArrowUp, PiWrench } from "react-icons/pi";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { HeroAside } from "@/components/page-illustration";

export const metadata = {
  title: "Technical support | VoloTech",
  description: "Technical support, maintenance, deployment, and troubleshooting for business systems.",
};

const supportAreas = [
  { icon: PiBug, title: "Find the fault", copy: "Trace a broken flow, confusing error, or slow page. We document what we find and the fix that makes sense." },
  { icon: PiCloudArrowUp, title: "Keep it running", copy: "Help with hosting, updates, monitoring, backups, and the routine work that prevents small problems from becoming outages." },
  { icon: PiWrench, title: "Make the next change", copy: "Add a feature, connect a new tool, or tidy up an older system without losing sight of how your team uses it today." },
];

export default function SupportPage() {
  return <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <SiteHeader />
    <main id="main-content" tabIndex={-1}>
      <section className="page-hero shell" aria-labelledby="support-title">
        <div className="page-hero-copy"><p className="eyebrow">Technical support</p><h1 id="support-title">When the system needs attention.</h1><p>Bring us the live issue, the awkward workaround, or the technical task that keeps getting pushed back. We will help you work out the next useful move.</p></div>
        <HeroAside kind="support"><div className="page-hero-note"><span className="meta-label">Good support starts with context</span><p>Share the affected system, what is going wrong, who it affects, and when it started. Never send passwords, API keys, or customer data.</p></div></HeroAside>
      </section>
      <section className="content-section shell" aria-labelledby="support-areas-title">
        <p className="eyebrow">What support can cover</p>
        <h2 id="support-areas-title">Help for the work after launch.</h2>
        <div className="support-grid">{supportAreas.map(({ icon: Icon, title, copy }) => <article className="support-card" key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>
      <section className="content-section shell"><div className="support-note"><h3>Need a quick answer or a larger fix?</h3><p>We can start with one technical question or review the wider setup. The contact page has a short form so you can describe the issue in your own words.</p></div></section>
      <section className="content-section shell"><div className="page-cta"><h2>Tell us what needs fixing.</h2><Link className="button button-primary" href="/contact?interest=Technical%20support%20or%20maintenance">Get technical support <PiArrowRight aria-hidden="true" /></Link></div></section>
    </main>
    <SiteFooter />
  </>;
}
