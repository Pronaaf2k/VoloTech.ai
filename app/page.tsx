import Link from "next/link";
import { PiArrowRight, PiArrowUpRight } from "react-icons/pi";
import { DestinationArtwork } from "@/components/destination-artwork";
import { HeroArtwork } from "@/components/hero-artwork";
import { TechnologyLogos } from "@/components/technology-logos";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const destinations = [
  ["Services", "Websites, applications, integrations, and automation.", "/services", "services"],
  ["Work", "Illustrative examples of what we could build together.", "/work", "work"],
  ["How we work", "A clear scope, working reviews, and a useful handover.", "/how-we-work", "process"],
  ["Support", "Help with bugs, maintenance, and the work after launch.", "/support", "support"],
] as const;

export default function Home() {
  return <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <SiteHeader />
    <main id="main-content" tabIndex={-1}>
      <section className="home-hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Business technology partner</p>
          <h1 id="hero-title"><span>Build the thing</span>{" "}<span>your business</span>{" "}<span>is missing.</span></h1>
          <p className="hero-description">We build websites, applications, and connected systems that help your business work better.</p>
          <div className="hero-actions"><Link className="button button-primary" href="/contact">Start a project <PiArrowUpRight aria-hidden="true" /></Link><Link className="text-link" href="/services">Explore services <PiArrowRight aria-hidden="true" /></Link></div>
        </div>
        <HeroArtwork />
      </section>
      <TechnologyLogos />
      <section className="home-overview shell" aria-labelledby="overview-title">
        <h2 id="overview-title">Find what you need.</h2>
        <div>{destinations.map(([title, copy, href, kind]) => <Link className="overview-row" key={href} href={href}><DestinationArtwork kind={kind} /><h3>{title}</h3><p>{copy}</p><PiArrowUpRight aria-hidden="true" /></Link>)}</div>
      </section>
      <section className="home-invitation shell" aria-label="Start a project"><div className="page-cta"><h2>Tell us what’s missing.</h2><Link className="button button-primary" href="/contact">Start a project <PiArrowUpRight aria-hidden="true" /></Link></div></section>
    </main>
    <SiteFooter />
  </>;
}

