"use client";

import { FormEvent, useState } from "react";

type FormState = { status: "idle" | "sending" | "success" | "error"; message: string };

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState({ status: "sending", message: "Sending your enquiry…" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "We could not send your enquiry.");
      form.reset();
      setState({ status: "success", message: result.message || "Thanks. We’ll be in touch shortly." });
    } catch (error) {
      setState({ status: "error", message: error instanceof Error ? error.message : "We could not send your enquiry. Please try again." });
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-label="Contact VoloTech.ai" aria-busy={state.status === "sending"}>
      <div className="form-heading"><span>PROJECT ENQUIRY</span><p>Fields marked * are required.</p></div>
      <div className="field-row">
        <label>Full name *<input name="name" autoComplete="name" maxLength={120} required /></label>
        <label>Work email *<input name="email" type="email" autoComplete="email" maxLength={180} spellCheck={false} required /></label>
      </div>
      <label>Company<input name="company" autoComplete="organization" maxLength={160} /></label>
      <label>Where should AI help first? *
        <select name="interest" required defaultValue="">
          <option value="" disabled>Select an area</option>
          <option>Connect our existing tools</option>
          <option>Automate a business workflow</option>
          <option>Build an AI operations agent</option>
          <option>Process documents and data</option>
          <option>Not sure yet</option>
        </select>
      </label>
      <label>What is slowing your team down? *<textarea name="message" rows={4} minLength={10} maxLength={3000} required placeholder="Tell us about the workflow, tools, and handoffs involved…" /></label>
      <button className="button button-primary form-submit" type="submit" disabled={state.status === "sending"}>{state.status === "sending" ? "Sending…" : "Send project enquiry"}<span aria-hidden="true">→</span></button>
      <p className={`form-status ${state.status}`} role="status" aria-live="polite">{state.message}</p>
    </form>
  );
}

