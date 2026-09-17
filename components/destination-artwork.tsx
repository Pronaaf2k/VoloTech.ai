import { PiCode, PiCheck, PiPulse } from "react-icons/pi";

type Kind = "services" | "work" | "process" | "support";

/** Small decorative objects, rendered with CSS instead of a second WebGL scene. */
export function DestinationArtwork({ kind }: { kind: Kind }) {
  return <span className={`destination-art destination-art--${kind}`} aria-hidden="true">
    {kind === "services" ? <span className="art-stack"><i /><i /><i><PiCode /></i></span> : null}
    {kind === "work" ? <span className="art-windows"><i className="art-window art-window-back"><b /><em /></i><i className="art-window art-window-front"><b /><em /><em /></i></span> : null}
    {kind === "process" ? <span className="art-path"><i /><i /><i><PiCheck /></i></span> : null}
    {kind === "support" ? <span className="art-signal"><i /><i /><span><PiPulse /></span></span> : null}
  </span>;
}
