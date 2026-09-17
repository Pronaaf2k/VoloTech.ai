import Link from "next/link";
import { PiArrowRight, PiArrowUpRight, PiFlowArrow, PiHeadset, PiStack, PiWrench } from "react-icons/pi";
import { HeroArtwork } from "@/components/hero-artwork";
import { TechnologyStack } from "@/components/technology-stack";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const destinations = [
  { index: "01", icon: PiStack, title: "Services", copy: "Websites, applications, integrations, and the systems that keep them useful.", href: "/services", link: "See what we build" },
  { index: "02", icon: PiFlowArrow, title: "Work", copy: "A few common project shapes, from customer portals to data moving between tools.", href: "/work", link: "View project examples" },
  { index: "03", icon: PiWrench, title: "How we work", copy: "A straightforward route from a business problem to a system your team can own.", href: "/how-we-work", link: "See the process" },
  { index: "04", icon: PiHeadset, title: "Support", copy: "Help with a live system, a difficult bug, or the technical work after launch.", href: "/support", link: "Get technical support" },
];

export default function Home() {
  return <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <SiteHeader />
    <main id="main-content" tabIndex={-1}>
      <section className="home-hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Business technology partner</p>
          <h1 id="hero-title">Build the thing your business is missing.</h1>
          <p className="hero-description">VoloTech.ai helps businesses make better use of the web, their data, and the tools they already pay for.</p>
          <div className="hero-actions"><Link className="button button-primary" href="/services">Explore services <PiArrowUpRight aria-hidden="true" /></Link><Link className="text-link" href="/contact">Start a project <PiArrowRight aria-hidden="true" /></Link></div>
        </div>
        <HeroArtwork />
      </section>

      <TechnologyStack />
      <section className="destination-section" aria-labelledby="destination-title">
        <div className="shell">
          <div className="section-heading"><p className="eyebrow">Find your starting point</p><h2 id="destination-title">Pick the part you need.</h2><p className="section-intro">Each page covers one part of the work. Start with the closest match, then bring us the details.</p></div>
          <div className="destination-grid">{destinations.map(({ index, icon: Icon, title, copy, href, link }) => <article className="destination-card" key={href}><div className="card-top"><span className="card-index">{index}</span><Icon aria-hidden="true" /></div><h3>{title}</h3><p>{copy}</p><Link className="text-link" href={href}>{link} <PiArrowUpRight aria-hidden="true" /></Link></article>)}</div>
        </div>
      </section>

      <section className="home-note shell" aria-label="VoloTech.ai approach summary"><p className="eyebrow">A useful place to begin</p><p>Some businesses need a new site. Others need a small fix that removes an expensive daily annoyance. We scope the work around that difference.</p><Link className="text-link" href="/how-we-work">How we work <PiArrowRight aria-hidden="true" /></Link></section>
    </main>
    <SiteFooter />
  </>;
}
