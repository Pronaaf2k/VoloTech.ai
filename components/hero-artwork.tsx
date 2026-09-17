"use client";

import { Component, useCallback, useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

const FlowSculpture = dynamic(() => import("./flow-sculpture"), { ssr: false });

class ArtworkBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function HeroArtwork() {
  const [reduced, setReduced] = useState(false);
  const [failed, setFailed] = useState(false);
  const handleFailure = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return <div className="hero-art" aria-label="Six orange metal ribbons forming a flowing sculpture">
    {!failed ? <ArtworkBoundary onFailure={handleFailure}><FlowSculpture reduced={reduced} onReady={() => undefined} onFailure={handleFailure} /></ArtworkBoundary> : null}
  </div>;
}
