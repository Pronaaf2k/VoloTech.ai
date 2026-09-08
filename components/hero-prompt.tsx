"use client";

import { useState } from "react";

const prompts = [
  "Connect our ERP and documents",
  "Automate production updates",
  "Build an internal AI agent",
];

export function HeroPrompt() {
  const [request, setRequest] = useState("");

  return (
    <div className="hero-prompt" data-has-value={request.length > 0}>
      <label htmlFor="ai-request">What would you like AI to handle?</label>
      <div className="prompt-input">
        <textarea id="ai-request" rows={2} value={request} onChange={(event) => setRequest(event.target.value)} placeholder="Describe a repetitive workflow…" />
        <a href="#contact" aria-label="Discuss this workflow with Volo AI">→</a>
      </div>
      <div className="prompt-chips" aria-label="Example workflows">
        {prompts.map((prompt) => <button type="button" aria-pressed={request === prompt} key={prompt} onClick={() => setRequest(prompt)}>{prompt}</button>)}
      </div>
      <span className="prompt-status" aria-live="polite">{request ? "Ready to map this workflow" : "Choose an example or type your own"}</span>
    </div>
  );
}
