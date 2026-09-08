"use client";

import { useRef, useState } from "react";
import { siClaude, siOdoo, siHubspot, siN8n, siGoogledrive, siWhatsapp, siGmail, siGooglecalendar, siNotion, siLinear, siGithub, siAirtable, siZapier, siMake, siDiscord, siZoho } from "simple-icons";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";

const tools = [
  siClaude, siOdoo, siHubspot, siN8n, siGoogledrive,
  siWhatsapp, siGmail, siGooglecalendar, siNotion, siLinear,
  siGithub, siAirtable, siZapier, siMake, siDiscord, siZoho,
  { slug: "gohighlevel", title: "GoHighLevel", path: "", mark: "GHL" },
  { slug: "wavv", title: "Wavv", path: "", mark: "W" },
  { slug: "pipedrive", title: "Pipedrive", path: "", mark: "P" },
];
export function Integrations() {
  const rail = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const start = useRef({ x: 0, scroll: 0 });

  function moveBy(direction: number) {
    rail.current?.scrollBy({ left: direction * Math.max(240, rail.current.clientWidth * .55), behavior: "smooth" });
  }

  return <section className="integrations shell" aria-label="Business tool integrations">
    <div className="integrations-heading"><p>Built around the tools<br /><span>you already work with.</span></p><div className="carousel-controls"><button type="button" onClick={() => moveBy(-1)} aria-label="Previous tools"><PiArrowLeft /></button><button type="button" onClick={() => moveBy(1)} aria-label="Next tools"><PiArrowRight /></button></div></div>
    <div className="integration-viewport" role="region" aria-roledescription="carousel" aria-label="Connected business tools">
      <div className={`integration-logos${isDragging ? " is-dragging" : ""}`} ref={rail} tabIndex={0} onPointerDown={event => { if (event.pointerType === "mouse" && event.button !== 0) return; dragging.current = true; setIsDragging(true); start.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft }; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={event => { if (!dragging.current) return; event.currentTarget.scrollLeft = start.current.scroll - (event.clientX - start.current.x); }} onPointerUp={event => { dragging.current = false; setIsDragging(false); event.currentTarget.releasePointerCapture(event.pointerId); }} onPointerCancel={() => { dragging.current = false; setIsDragging(false); }} onKeyDown={event => { if (event.key === "ArrowLeft") { event.preventDefault(); moveBy(-1); } if (event.key === "ArrowRight") { event.preventDefault(); moveBy(1); } }}>
        {tools.map(tool => <div className="integration-logo" key={tool.slug}>{tool.path ? <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={tool.path} /></svg> : <span className="integration-mark" aria-hidden="true">{"mark" in tool ? tool.mark : ""}</span>}<span>{tool.title}</span></div>)}
      </div>
    </div>
  </section>;
}
