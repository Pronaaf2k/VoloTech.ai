"use client";
import { useEffect, useRef } from "react";
type Tool = { title: string; path: string };

export function TechnologyCarousel({ tools }: { tools: Tool[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number } | null>(null);
  const move = (distance: number) => {
    const element = rail.current;
    if (!element) return;
    const width = element.scrollWidth / 3;
    if (!width) return;
    element.scrollLeft = width + ((element.scrollLeft + distance - width) % width + width) % width;
  };
  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(element);
    const resize = new ResizeObserver(() => {
      if (!motion.matches) move(0);
    });
    resize.observe(element);
    const timer = window.setInterval(() => {
      if (!motion.matches && visible && !document.hidden) move(1);
    }, 24);
    return () => { clearInterval(timer); observer.disconnect(); resize.disconnect(); };
  }, []);
  return <section className="technology-section shell" aria-label="Technology stack">
    <div className="technology-heading"><div><p className="eyebrow">The tools behind the work</p><h2>A stack for each job.</h2></div></div>
    <div className="technology-carousel" ref={rail} tabIndex={0} role="region" aria-label="Technology logos. Drag horizontally or use the arrow keys to explore."
      onPointerDown={event => {
        if (!event.isPrimary || event.button !== 0) return;
        drag.current = { id: event.pointerId, x: event.clientX };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={event => {
        if (drag.current?.id !== event.pointerId) return;
        move(drag.current.x - event.clientX);
        drag.current.x = event.clientX;
      }}
      onPointerUp={event => {
        drag.current = null;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={() => { drag.current = null; }}
      onLostPointerCapture={() => { drag.current = null; }}
      onDragStart={event => event.preventDefault()}
      onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowRight" ? 150 : -150);
        }
      }}>
      <div className="technology-track">
        {[0, 1, 2].map(copy => <div className="technology-group" key={copy} aria-hidden={copy !== 1 || undefined}>{tools.map(tool => <div className="technology-logo" key={tool.title}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={tool.path} fill="currentColor" /></svg><span>{tool.title}</span></div>)}</div>)}
      </div>
    </div>
  </section>;
}
