import { ContactForm } from "@/components/contact-form";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const metadata = {
  title: "Contact | VoloTech",
  description: "Tell VoloTech what you want to build, connect, or fix.",
};

export default function ContactPage() {
  return <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <SiteHeader />
    <main id="main-content" tabIndex={-1}>
      <section className="contact-layout shell" aria-labelledby="contact-title">
        <div className="contact-copy"><p className="eyebrow">Start a conversation</p><h1 id="contact-title">Tell us what you need.</h1><p>A new project, a system that needs fixing, or a question about what is possible. Start with the business problem.</p><h2>What happens next?</h2><p>We review your enquiry and follow up by email to clarify the scope and discuss a useful next step.</p><p className="contact-aside">For support, include the affected system and what is going wrong. Please do not send passwords, API keys, or customer data.</p></div>
        <ContactForm />
      </section>
    </main>
    <SiteFooter />
  </>;
}
