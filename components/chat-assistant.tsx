"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PiChatCircleDots, PiX, PiArrowUpRight } from "react-icons/pi";

export function ChatAssistant() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const panel = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = () => { panel.current?.close(); setOpen(false); trigger.current?.focus(); };
  useEffect(() => { if (open) panel.current?.showModal(); }, [open]);
  return <>
    <button ref={trigger} className={`chat-launcher ${pathname === "/contact" ? "chat-launcher--contact" : ""}`} type="button" aria-label="Open VoloTech assistant" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}><PiChatCircleDots aria-hidden="true" /><span>Ask VoloTech</span></button>
    <dialog ref={panel} className="chat-panel" aria-labelledby="chat-title" onCancel={close} onClick={event => { if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close(); } }}>
      <header className="chat-heading"><div className="chat-avatar"><PiChatCircleDots aria-hidden="true" /></div><div><h2 id="chat-title">VoloTech assistant</h2><p>AI chat · Coming soon</p></div><button type="button" aria-label="Close chat" onClick={close}><PiX aria-hidden="true" /></button></header>
      <div className="chat-body"><p className="chat-bubble">Hi there. What would you like to build, connect, or fix?</p><p className="chat-status">AI replies aren&apos;t connected yet. Explore our services or send the team an enquiry.</p><div className="chat-suggestions"><Link href="/services" onClick={close}>Explore services <PiArrowUpRight aria-hidden="true" /></Link><Link href="/support" onClick={close}>Get technical support <PiArrowUpRight aria-hidden="true" /></Link><Link href="/contact" onClick={close}>Contact the team <PiArrowUpRight aria-hidden="true" /></Link></div></div>
      <div className="chat-composer"><label htmlFor="chat-draft">Your message</label><textarea id="chat-draft" value={draft} onChange={event => setDraft(event.target.value)} rows={2} maxLength={2000} placeholder="What do you have in mind?" aria-describedby="chat-note" /><div><p id="chat-note">Draft only. Messages are not sent.</p><button type="button" disabled>Send</button></div></div>
    </dialog>
  </>;
}
