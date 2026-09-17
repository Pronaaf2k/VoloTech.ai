"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
type FormState = { status: "idle" | "sending" | "success" | "error"; message: string };
export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });
  const interest = useRef<HTMLSelectElement>(null);
  const submitting = useRef(false);
  useEffect(() => {
    const requestedInterest = new URLSearchParams(window.location.search).get("interest");
    if (requestedInterest && interest.current && [...interest.current.options].some(option => option.value === requestedInterest)) interest.current.value = requestedInterest;
  }, []);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    const form = event.currentTarget;
    setState({ status: "sending", message: "Sending your enquiry..." });
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))), signal: AbortSignal.timeout(15000) });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "We could not send your enquiry. Your details are still in the form. Please try again.");
      form.reset();
      setState({ status: "success", message: result.message || "Thank you. Your enquiry has been sent." });
    } catch (error) {
      setState({ status: "error", message: error instanceof Error && error.name !== "TimeoutError" ? error.message : "The request timed out. Your details are still in the form. Please try again." });
    } finally { submitting.current = false; }
  }
  return <form className="contact-form" id="support-request" onSubmit={handleSubmit} aria-label="Contact VoloTech" aria-busy={state.status === "sending"}>
    <div className="form-heading"><strong>Project & support enquiry</strong><p>Fields marked * are required.</p></div>
    <div className="field-row"><label>Full name *<input name="name" autoComplete="name" maxLength={120} required /></label><label>Email *<input name="email" type="email" autoComplete="email" maxLength={180} spellCheck={false} required /></label></div>
    <label>Company <span className="optional">Optional</span><input name="company" autoComplete="organization" maxLength={160} /></label>
    <label>What do you need? *<select ref={interest} name="interest" required defaultValue=""><option value="" disabled>Select an area</option><option>Website or landing page</option><option>Web application or backend system</option><option>MCP development or integration</option><option>Automation or internal tool</option><option>Technical support or maintenance</option><option>Consultation to discuss a project</option><option>Not sure yet</option></select></label>
    <label>Tell us about it *<textarea name="message" rows={4} minLength={10} maxLength={3000} required placeholder="What should we build, connect, or fix? Include your existing tools and any deadline." aria-describedby="enquiry-note" /></label>
    <p className="form-note" id="enquiry-note">Include at least 10 characters. Share only the details needed to discuss your request. No passwords or sensitive data.</p>
    <button className="button button-primary form-submit" type="submit" disabled={state.status === "sending"}>{state.status === "sending" ? "Sending..." : "Send enquiry"}<span aria-hidden="true">→</span></button>
    <p className={`form-status ${state.status}`} role="status" aria-live="polite" aria-atomic="true">{state.message}</p>
  </form>;
}
