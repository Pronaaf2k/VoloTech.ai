import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ message: "Send the form as JSON." }, { status: 415 });
  }

  let body: Record<string, unknown>;
  try {
    const payload: unknown = await request.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("Invalid payload");
    body = payload as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "We could not read this enquiry. Please try again." }, { status: 400 });
  }
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const interest = typeof body.interest === "string" ? body.interest.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !emailPattern.test(email) || !interest || message.length < 10) {
    return NextResponse.json({ message: "Enter a valid name, email, area of interest, and a little more detail." }, { status: 400 });
  }

  const submission = {
    name: name.slice(0, 120),
    email: email.slice(0, 180),
    company: typeof body.company === "string" ? body.company.trim().slice(0, 160) : "",
    phone: typeof body.phone === "string" ? body.phone.trim().slice(0, 60) : "",
    interest: interest.slice(0, 160),
    message: message.slice(0, 3000),
    source: "volotech-ai-website",
  };

  const endpoint = process.env.CONTACT_API_URL;
  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return NextResponse.json({ message: "We could not send your enquiry right now. Please try again." }, { status: 502 });
    } catch {
      return NextResponse.json({ message: "We could not reach our enquiry service. Your details are still in the form. Please try again." }, { status: 502 });
    }
  } else {
    return NextResponse.json({ message: "Contact delivery is being configured. Please try again shortly." }, { status: 503 });
  }

  return NextResponse.json({ message: "Thanks. We’ll review your workflow and get back to you shortly." }, { status: 201 });
}
