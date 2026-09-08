"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { siClaude, siOdoo, siHubspot, siN8n, siGoogledrive, siWhatsapp, siGmail, siGooglecalendar, siNotion, siLinear, siGithub, siAirtable, siZapier, siMake, siDiscord, siZoho } from "simple-icons";

const tools = [
  siClaude, siOdoo, siHubspot, siN8n, siGoogledrive,
  siWhatsapp, siGmail, siGooglecalendar, siNotion, siLinear,
  siGithub, siAirtable, siZapier, siMake, siDiscord, siZoho,
  { slug: "gohighlevel", title: "GoHighLevel", path: "", mark: "GHL" },
  { slug: "wavv", title: "Wavv", path: "", mark: "W" },
  { slug: "pipedrive", title: "Pipedrive", path: "", mark: "P" },
];
export function Integrations() {
  const reduced = useReducedMotion();
  const rail = useRef<HTMLDivElement>(null);
  const firstGroup = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const start = useRef({ x: 0, scroll: 0 });

  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min(32, now - last);
      last = now;
      const viewport = rail.current;
      const loopWidth = firstGroup.current?.offsetWidth ?? 0;
      if (viewport && loopWidth && !dragging.current && !reduced) {
        viewport.scrollLeft += elapsed * .026;
        if (viewport.scrollLeft >= loopWidth) viewport.scrollLeft -= loopWidth;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  return <section className="integrations shell" aria-label="Business tool integrations">
    <div className="integrations-heading"><p>Built around the tools<br /><span>you already work with.</span></p></div>
    <div className={`integration-viewport${isDragging ? " is-dragging" : ""}`} ref={rail} role="region" aria-roledescription="carousel" aria-label="Connected business tools" tabIndex={0} onPointerDown={event => { if (event.pointerType === "mouse" && event.button !== 0) return; dragging.current = true; setIsDragging(true); start.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft }; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={event => { if (!dragging.current) return; event.currentTarget.scrollLeft = start.current.scroll - (event.clientX - start.current.x); }} onPointerUp={event => { dragging.current = false; setIsDragging(false); event.currentTarget.releasePointerCapture(event.pointerId); }} onPointerCancel={() => { dragging.current = false; setIsDragging(false); }}>
      <div className="integration-logos">
        <div className="integration-group" ref={firstGroup}>{tools.map(tool => <div className="integration-logo" key={tool.slug}>{tool.path ? <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={tool.path} /></svg> : <span className="integration-mark" aria-hidden="true">{"mark" in tool ? tool.mark : ""}</span>}<span>{tool.title}</span></div>)}</div>
        <div className="integration-group" aria-hidden="true">{tools.map(tool => <div className="integration-logo" key={`duplicate-${tool.slug}`}>{tool.path ? <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={tool.path} /></svg> : <span className="integration-mark" aria-hidden="true">{"mark" in tool ? tool.mark : ""}</span>}<span>{tool.title}</span></div>)}</div>
      </div>
    </div>
  </section>;
}
