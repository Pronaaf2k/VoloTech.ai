"use client";
import { Component, useCallback, useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
const FlowSculpture = dynamic(() => import("./flow-sculpture"), { ssr: false });
class ArtworkBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}
export function HeroArtwork() {
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);
  const handleFailure = useCallback(() => setFailed(true), []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { if (media.matches) { setActive(false); setReady(false); } };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return <div className="hero-art" onPointerEnter={() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) setActive(true);
  }}>
    <Image src="/ribbon-still.png" alt="Six orange metal ribbons forming a flowing sculpture" fill priority sizes="(max-width: 767px) 100vw, 48vw" style={{ objectFit: "contain", opacity: active && ready && !failed ? 0 : 1 }} />
    {active && !failed ? <ArtworkBoundary onFailure={handleFailure}><FlowSculpture reduced={false} onReady={handleReady} onFailure={handleFailure} /></ArtworkBoundary> : null}
  </div>;
}
