import Image from "next/image";
import { PiArrowDownRight, PiArrowUpRight, PiArrowRight, PiCheck } from "react-icons/pi";
import { ContactForm } from "@/components/contact-form";
import { IndustryExplorer } from "@/components/industry-explorer";
import { WorkflowDemo } from "@/components/workflow-demo";
import { Reveal, HeroArtwork, MobileNav } from "@/components/motion-elements";
import { Integrations } from "@/components/integrations";

function Brand() {
  return <span className="brand" translate="no"><Image src="/volo-mark.webp" alt="" width={32} height={32} /><span>VoloTech<span className="brand-domain">.ai</span></span></span>;
}

export default function Home() {
  return <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <header className="site-header shell">
      <a href="#top" aria-label="VoloTech.ai home"><Brand /></a>
      <nav className="desktop-nav" aria-label="Main navigation"><a href="#solutions">Solutions</a><a href="#industries">Industries</a><a href="#contact">Contact</a></nav>
      <a className="nav-cta" href="#contact">Get started <PiArrowUpRight aria-hidden="true" /></a>
      <MobileNav />
    </header>
    <main id="main-content">
      <section className="hero shell" id="top">
        <HeroArtwork />
        <div className="hero-content">
          <Reveal><p className="eyebrow">AI built for the way you work</p></Reveal>
          <Reveal delay={0.08}><h1>Your business.<br /><span>In full flow.</span></h1></Reveal>
          <Reveal delay={0.16}><p className="hero-description">AI agents that connect your tools, move work forward,<br className="desktop-break" /> and keep your people in control.</p></Reveal>
          <Reveal delay={0.24}><div className="hero-actions"><a className="button button-primary" href="#contact">Put AI to work <PiArrowUpRight aria-hidden="true" /></a><a className="text-link" href="#solutions">Explore the possibilities <PiArrowDownRight aria-hidden="true" /></a></div></Reveal>
        </div>
      </section>
      <Integrations />
      <section className="solutions-section shell section-space" id="solutions">
        <Reveal><h2>Less passing work around.<br /><span className="muted">More moving it forward.</span></h2><p className="section-intro">Your systems already hold the context. We connect it to AI that can do something useful with it.</p></Reveal>
        <WorkflowDemo />
      </section>
      <section className="industries-section section-space" id="industries"><div className="shell">
        <Reveal><p className="eyebrow">Built for businesses in Bangladesh</p><h2>Real operations.<br />Real places to start.</h2><p className="section-intro">Start with the handoffs that slow your team down.</p></Reveal>
        <IndustryExplorer />
      </div></section>
      <section className="approach shell section-space">
        <Reveal><div className="approach-heading"><PiArrowDownRight aria-hidden="true" /><h2>Start small.<br /><span className="muted">Connect what matters.</span></h2></div></Reveal>
        <div className="approach-grid grid grid-cols-1 md:grid-cols-3">
          {[['Find the friction', 'Identify one repeated workflow, the people involved, and where information gets lost.'], ['Build the connection', 'Bring the right systems together with clear permissions and human approval.'], ['Put it to work', 'Give your team a practical AI workflow with clear ownership and recorded decisions.']].map(([title, copy], i) => <Reveal delay={i * 0.08} key={title}><span className="step-number">0{i + 1}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}
        </div>
      </section>
      <section className="contact-section shell section-space" id="contact">
        <Reveal><div className="contact-copy"><h2>Make room<br />for better<br /><span>work.</span></h2><p>Tell us where work gets stuck. We’ll identify a practical first AI integration and the systems it needs to connect.</p><div className="contact-note"><PiCheck aria-hidden="true" /> Your existing tools. A useful first step.</div></div></Reveal>
        <ContactForm />
      </section>
    </main>
    <footer className="shell"><div className="footer-top"><a href="#top" aria-label="VoloTech.ai home"><Brand /></a><p>AI agents and connected workflows<br />for businesses in Bangladesh.</p><a className="text-link" href="#top">Back to top <PiArrowUpRight aria-hidden="true" /></a></div><div className="footer-bottom"><small>© {new Date().getFullYear()} VoloTech.ai</small><nav aria-label="Footer navigation"><a href="#solutions">Solutions</a><a href="#industries">Industries</a><a href="#contact">Contact <PiArrowRight aria-hidden="true" /></a></nav></div></footer>
  </>;
}

