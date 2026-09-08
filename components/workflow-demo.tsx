"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PiArrowRight, PiCheck, PiFileText, PiDatabase, PiShieldCheck, PiArrowCounterClockwise, PiPlay } from "react-icons/pi";

const stages = [
  { name: 'Connect', title: 'The right context. In one place.', copy: 'Bring buyer documents, ERP records, and shipment data into one controlled workflow.', action: 'Prepare next action' },
  { name: 'Automate', title: 'Work moves. Your team decides.', copy: 'The agent checks incoming information and prepares a delivery update for a reviewer.', action: 'Review prepared action' },
  { name: 'Control', title: 'A human has the final say.', copy: 'Choose what agents can access, what needs approval, and how every decision is recorded.', action: 'Approve example action' },
];

export function WorkflowDemo() {
  const [active, setActive] = useState(0);
  const [approved, setApproved] = useState(false);
  const reduced = useReducedMotion();
  const stage = stages[active];
  function select(index: number) { setActive(index); setApproved(false); }
  return <div className="workflow-demo">
    <div className="workflow-toolbar"><span><PiPlay aria-hidden="true" /> Explore an example workflow</span><div className="workflow-tabs" aria-label="Workflow stages">{stages.map((item, i) => <button key={item.name} type="button" aria-pressed={active === i} onClick={() => select(i)}>{item.name}</button>)}</div></div>
    <div className="workflow-body">
      <div className="workflow-copy"><span className="mono-label">AI operations agents / MCP integrations</span><h3>{stage.title}</h3><p>{stage.copy}</p>{active < 2 && <button className="text-link" type="button" onClick={() => approved ? select(0) : active < 2 ? select(active + 1) : setApproved(true)}>{approved ? 'Restart walkthrough' : stage.action}{approved ? <PiArrowCounterClockwise aria-hidden="true" /> : <PiArrowRight aria-hidden="true" />}</button>}</div>
      <div className="workflow-canvas" aria-live="polite"><AnimatePresence mode="wait"><motion.div key={`${active}-${approved}`} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.25 }} className="workflow-state">
        {active === 0 ? <><div className="source-row"><span><PiFileText />Buyer documents</span><span><PiDatabase />ERP records</span><span><PiFileText />Shipment data</span></div><div className="connector-lines" aria-hidden="true"><i /><i /><i /></div><div className="connection-hub"><PiPlugsMark /><strong>VoloTech.ai</strong><span>Approved context</span></div><div className="hub-output"><PiArrowRight aria-hidden="true" /> Ready for the next step</div></> : active === 1 ? <div className="action-list"><div><PiCheck /><span>Purchase order read<small>Buyer documents matched to ERP records</small></span></div><div><PiCheck /><span>Shipment status checked<small>Latest production context added</small></span></div><div className="action-pending"><PiShieldCheck /><span>Delivery update prepared<small>Waiting for your review</small></span></div></div> : <div className={`approval-card ${approved ? 'approved' : ''}`}><div className="approval-label">{approved ? <PiCheck /> : <PiShieldCheck />}{approved ? 'Example action approved' : 'Your approval required'}</div><h4>{approved ? 'You made the call.' : 'Send revised delivery update?'}</h4><p>{approved ? 'The walkthrough is complete. In your workflow, approved actions follow the permissions you set.' : 'The latest production status and shipment schedule are ready for review.'}</p><div className="approval-sources">Sources <span>ERP</span><span>Shipment data</span><span>Buyer thread</span></div><button type="button" className="button button-primary" onClick={() => approved ? select(0) : setApproved(true)}>{approved ? 'Try again' : 'Approve example'}{approved ? <PiArrowCounterClockwise /> : <PiCheck />}</button></div>}
      </motion.div></AnimatePresence></div>
    </div>
    <div className="workflow-bottom"><span>Illustrative workflow. No live systems connected.</span><span>Human approval built in <PiShieldCheck aria-hidden="true" /></span></div>
  </div>;
}
function PiPlugsMark() { return <PiDatabase aria-hidden="true" className="hub-icon" />; }

