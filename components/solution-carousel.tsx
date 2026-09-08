"use client";

import Image from "next/image";
import { useState } from "react";

const slides = [
  {
    label: "Connect",
    eyebrow: "MCP integrations",
    title: "Give AI the right context.",
    copy: "Connect approved agents to your ERP, CRM, documents, and databases without replacing your current systems.",
    link: "Plan an integration",
  },
  {
    label: "Automate",
    eyebrow: "AI operations agents",
    title: "Move work forward automatically.",
    copy: "Read incoming work, prepare the next step, and route exceptions so your team can focus on decisions.",
    link: "Show us your workflow",
  },
  {
    label: "Control",
    eyebrow: "Human approval",
    title: "Automate with clear guardrails.",
    copy: "Choose what an agent can access, which actions need approval, and how every decision is recorded.",
    link: "Design the guardrails",
  },
];

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function SlideVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="feature-visual integration-visual" aria-label="Volo AI connects business systems through an MCP layer">
        <div className="visual-title"><span>LIVE CONNECTIONS</span><b>6 active</b></div>
        <div className="integration-map">
          <span className="tool-node node-erp">ERP</span><span className="tool-node node-crm">CRM</span><span className="tool-node node-docs">Docs</span><span className="tool-node node-data">Data</span>
          <div className="ai-core"><Image src="/volo-mark.webp" alt="" width={42} height={42} /><strong>Volo AI</strong><small>MCP layer</small></div>
        </div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="feature-visual workflow-visual" aria-label="Example automated order workflow">
        <div className="visual-title"><span>ORDER WORKFLOW</span><b>Running</b></div>
        <div className="workflow-list">
          <div><span className="step-icon complete">✓</span><p><strong>Purchase order received</strong><small>Document read and matched</small></p><em>09:42</em></div>
          <div><span className="step-icon complete">✓</span><p><strong>ERP record updated</strong><small>12 fields synchronized</small></p><em>09:43</em></div>
          <div className="current"><span className="step-icon">→</span><p><strong>Production risk detected</strong><small>Manager review prepared</small></p><em>Now</em></div>
        </div>
      </div>
    );
  }

  return (
    <div className="feature-visual approval-visual" aria-label="Human approval interface for an AI-prepared action">
      <div className="approval-head"><span>Approval required</span><b>High priority</b></div>
      <h3>Send revised delivery update?</h3>
      <p>The agent used the latest production status and shipment schedule to prepare this action.</p>
      <div className="source-chips"><span>ERP</span><span>Shipment data</span><span>Buyer thread</span></div>
      <div className="approval-actions"><span>Review details</span><strong>Approve action</strong></div>
    </div>
  );
}

export function SolutionCarousel() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  const selectPrevious = () => setActive((current) => (current - 1 + slides.length) % slides.length);
  const selectNext = () => setActive((current) => (current + 1) % slides.length);

  return (
    <div className="solution-carousel" role="region" aria-roledescription="carousel" aria-label="Volo AI solutions">
      <div className="carousel-tabs" aria-label="Choose a solution">
        {slides.map((item, index) => <button type="button" aria-pressed={active === index} key={item.label} onClick={() => setActive(index)}>{item.label}</button>)}
      </div>
      <article className="feature-row" aria-live="polite" key={active}>
        <div className="feature-copy">
          <p className="eyebrow">{slide.eyebrow}</p>
          <h3>{slide.title}</h3>
          <p>{slide.copy}</p>
          <a href="#contact">{slide.link} <ArrowIcon /></a>
        </div>
        <SlideVisual index={active} />
      </article>
      <div className="carousel-controls">
        <span>{active + 1} / {slides.length}</span>
        <div><button type="button" onClick={selectPrevious} aria-label="Previous solution">←</button><button type="button" onClick={selectNext} aria-label="Next solution">→</button></div>
      </div>
    </div>
  );
}
