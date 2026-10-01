import nodemailer from "nodemailer";

function clean(value, max = 5000) {
  return String(value ?? "").trim().slice(0, max);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { GMAIL_USER, GMAIL_APP_PASSWORD, TO_EMAIL } = process.env;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error("Missing Gmail environment variables.");
    return res.status(500).json({ error: "Email service is not configured." });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const name = clean(body.name, 120);
    const email = clean(body.email, 254);
    const company = clean(body.company, 200);
    const message = clean(body.message, 5000);
    const services = Array.isArray(body.services) ? body.services.map((x) => clean(x, 100)).join(", ") : "";
    const budget = Array.isArray(body.budget) ? body.budget.map((x) => clean(x, 100)).join(", ") : "";
    const timeline = Array.isArray(body.timeline) ? body.timeline.map((x) => clean(x, 100)).join(", ") : "";

    if (!name || !email || !/^\S+@\S+\.\S+$/.test(email) || !services) {
      return res.status(400).json({ error: "Please complete the required fields." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    });

    await transporter.sendMail({
      from: `"vrapitup Website" <${GMAIL_USER}>`,
      to: TO_EMAIL || GMAIL_USER,
      replyTo: email,
      subject: `New vrapitup enquiry — ${name}`,
      text: [
        "NEW VRAPITUP PROJECT ENQUIRY",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Company / website: ${company || "Not provided"}`,
        `Services: ${services}`,
        `Budget: ${budget || "Not provided"}`,
        `Timeline: ${timeline || "Not provided"}`,
        "",
        "What they want to upgrade:",
        message || "Not provided",
      ].join("\n"),
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Enquiry email error:", error);
    return res.status(500).json({ error: "Could not send the enquiry." });
  }
}
