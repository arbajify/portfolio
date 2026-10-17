/* ==========================================================================
   Arbaj Ahmad Portfolio — Node.js + Express + Nodemailer Backend
   Routes:
   - GET  /              -> Serves static frontend (index.html, css/, js/, assets/)
   - GET  /api/health    -> Health check status
   - POST /api/contact   -> Sends "Text Me" form submissions directly to
                            arbajahmad1089@gmail.com via Nodemailer SMTP
   ========================================================================== */

const path = require("path");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const OWNER_EMAIL = process.env.OWNER_EMAIL || "arbajahmad1089@gmail.com";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the static frontend files from the project root
app.use(express.static(path.join(__dirname, "..")));

// Configure Nodemailer SMTP transporter (Gmail App Password or custom SMTP)
const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE || "gmail",
  auth: {
    user: process.env.SMTP_USER || OWNER_EMAIL,
    pass: process.env.SMTP_PASS || ""
  }
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    owner: "Arbaj Ahmad",
    recipient: OWNER_EMAIL
  });
});

app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "Name, email, and message are required."
    });
  }

  const mailOptions = {
    from: `"${name} (Portfolio Contact)" <${process.env.SMTP_USER || OWNER_EMAIL}>`,
    replyTo: email,
    to: OWNER_EMAIL,
    subject: `[Portfolio Text Me] ${subject || "New Inquiry"} — from ${name}`,
    text: `You received a new message from your portfolio website:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: Georgia, serif; background: #120e0c; color: #f5efe6; padding: 28px; border-radius: 16px; border: 1px solid #c8a276;">
        <h2 style="color: #c8a276; margin-top: 0;">New Portfolio Message for Arbaj Ahmad</h2>
        <p><strong>From:</strong> ${name} (<a href="mailto:${email}" style="color: #c8a276;">${email}</a>)</p>
        <p><strong>Subject:</strong> ${subject || "Portfolio Inquiry"}</p>
        <hr style="border: none; border-top: 1px solid rgba(200, 162, 118, 0.25); margin: 18px 0;" />
        <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      success: true,
      message: `Email delivered to ${OWNER_EMAIL}`
    });
  } catch (err) {
    console.error("Nodemailer Error:", err.message);
    return res.status(500).json({
      success: false,
      error: "SMTP delivery failed. Check SMTP_USER and SMTP_PASS in .env."
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Arbaj Ahmad Portfolio & Email Backend running at http://localhost:${PORT}`);
});
