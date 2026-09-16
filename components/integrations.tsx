"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const lastPointerX = useRef(0);

  const wrapScrollPosition = () => {
    const viewport = rail.current;
    const group = firstGroup.current;
    const loopWidth = group ? group.getBoundingClientRect().left - (group.previousElementSibling?.getBoundingClientRect().left ?? 0) : 0;
    if (!viewport || !loopWidth) return;

    if (viewport.scrollLeft >= loopWidth * 2) viewport.scrollLeft -= loopWidth;
    else if (viewport.scrollLeft < loopWidth) viewport.scrollLeft += loopWidth;
  };

  useLayoutEffect(() => {
    const viewport = rail.current;
    const group = firstGroup.current;
    if (!viewport || !group) return;

    const placeAtMiddleCopy = () => {
      viewport.scrollLeft = group.offsetWidth;
    };

    placeAtMiddleCopy();
    const observer = new ResizeObserver(placeAtMiddleCopy);
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    let last = performance.now();
    let pendingPixels = 0;
    const tick = (now: number) => {
      const elapsed = Math.min(32, now - last);
      last = now;
      const viewport = rail.current;
      const loopWidth = firstGroup.current?.offsetWidth ?? 0;
      if (viewport && loopWidth && !dragging.current) {
        // Keep subpixel movement between frames instead of losing it to scroll rounding.
        pendingPixels += elapsed * .026;
        const pixels = Math.floor(pendingPixels);
        if (pixels > 0) {
          viewport.scrollLeft += pixels;
          pendingPixels -= pixels;
          wrapScrollPosition();
        }
      } else {
        pendingPixels = 0;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  return <section className="integrations shell" aria-label="Business tool integrations">
    <div className="integrations-heading"><p>Built around the tools<br /><span>you already work with.</span></p></div>
    <div className={`integration-viewport${isDragging ? " is-dragging" : ""}`} ref={rail} role="region" aria-roledescription="carousel" aria-label="Connected business tools" tabIndex={0} onDragStart={event => event.preventDefault()} onPointerDown={event => { if (event.pointerType === "mouse" && event.button !== 0) return; dragging.current = true; setIsDragging(true); lastPointerX.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={event => { if (!dragging.current) return; event.currentTarget.scrollLeft += lastPointerX.current - event.clientX; lastPointerX.current = event.clientX; wrapScrollPosition(); }} onPointerUp={event => { dragging.current = false; setIsDragging(false); if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }} onPointerCancel={() => { dragging.current = false; setIsDragging(false); }} onLostPointerCapture={() => { dragging.current = false; setIsDragging(false); }}>
      <div className="integration-logos">
        <div className="integration-group" aria-hidden="true">{tools.map(tool => <div className="integration-logo" key={`leading-${tool.slug}`}>{tool.path ? <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={tool.path} /></svg> : <span className="integration-mark" aria-hidden="true">{"mark" in tool ? tool.mark : ""}</span>}<span>{tool.title}</span></div>)}</div>
        <div className="integration-group" ref={firstGroup}>{tools.map(tool => <div className="integration-logo" key={tool.slug}>{tool.path ? <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={tool.path} /></svg> : <span className="integration-mark" aria-hidden="true">{"mark" in tool ? tool.mark : ""}</span>}<span>{tool.title}</span></div>)}</div>
        <div className="integration-group" aria-hidden="true">{tools.map(tool => <div className="integration-logo" key={`duplicate-${tool.slug}`}>{tool.path ? <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={tool.path} /></svg> : <span className="integration-mark" aria-hidden="true">{"mark" in tool ? tool.mark : ""}</span>}<span>{tool.title}</span></div>)}</div>
      </div>
    </div>
  </section>;
}
