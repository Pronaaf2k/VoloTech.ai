"use client";

import { useState } from "react";

const industries = [
  {
    name: "Garments & textiles",
    eyebrow: "Order-to-production",
    title: "Keep every order moving.",
    copy: "Connect buyer documents, ERP records, production updates, quality reports, and shipment status in one controlled flow.",
    systems: ["ERP", "Buyer docs", "Production", "Shipping"],
    outcome: "Exceptions reach the right person before the next handoff.",
  },
  {
    name: "Logistics",
    eyebrow: "Exception-to-resolution",
    title: "Respond before delays spread.",
    copy: "Bring together shipment events, routing data, customer threads, and operational alerts without another manual status sheet.",
    systems: ["TMS", "Email", "Tracking", "CRM"],
    outcome: "Teams receive a prepared update and a clear next action.",
  },
  {
    name: "Financial operations",
    eyebrow: "Document-to-approval",
    title: "Review work with better context.",
    copy: "Organize documents, check required fields, surface exceptions, and route high-impact actions through human approval.",
    systems: ["Documents", "ERP", "Policies", "Approvals"],
    outcome: "Reviewers spend time on exceptions instead of data gathering.",
  },
];

export function IndustryExplorer() {
  const [active, setActive] = useState(0);
  const industry = industries[active];

  return (
    <div className="industry-explorer">
      <div className="industry-tabs" aria-label="Choose an industry">
        {industries.map((item, index) => (
          <button type="button" aria-pressed={active === index} onClick={() => setActive(index)} key={item.name}>
            <span>{String(index + 1).padStart(2, "0")}</span>{item.name}
          </button>
        ))}
      </div>
      <article className="industry-panel" key={active} aria-live="polite">
        <p className="eyebrow">{industry.eyebrow}</p>
        <h3>{industry.title}</h3>
        <p>{industry.copy}</p>
        <div className="industry-flow" aria-label="Connected systems">
          {industry.systems.map((system, index) => <span key={system}>{system}{index < industry.systems.length - 1 ? <i aria-hidden="true">→</i> : null}</span>)}
        </div>
        <strong>{industry.outcome}</strong>
      </article>
    </div>
  );
}
