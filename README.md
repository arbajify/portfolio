# Arbaj Ahmad — 3D Portfolio (Heritage Espresso Edition)

Clean, production-ready full-stack portfolio for **Arbaj Ahmad**, designed for direct GitHub deployment (`github.com/arbajify`) with an integrated **Node.js + Express + Nodemailer** email backend.

---

## 1. Project File Structure

```text
arbaj_portfolio_project/
├── index.html          # Production HTML5 layout (3-stage 3D portrait + resume sections + Text Me form)
├── css/
│   └── styles.css      # Heritage Espresso palette (#120e0c & #c8a276) + 3D perspective & scroll rules
├── js/
│   ├── icons.js        # Official SVG brand logos for all languages, frameworks, tools & libraries
│   ├── data.js         # Resume data parsed from Arbaj Ahmad.pdf
│   └── app.js          # 3-stage scroll choreography, 3D tilt physics & "Text Me" email dispatcher
├── assets/
│   └── me.jpg          # Studio portrait of Arbaj Ahmad
├── backend/
│   └── server.js       # Express + Nodemailer SMTP server delivering messages to arbajahmad1089@gmail.com
├── package.json        # Node.js dependencies (express, nodemailer, cors, dotenv)
├── .env.example        # Environment variables template for Gmail SMTP
├── README.md           # Tooling rationale & deployment instructions
└── PROGRAM_FLOW.md     # Architectural & execution flow documentation
```

---

## 2. Why We Chose Each Tool

1. **Heritage Espresso Palette (`css/styles.css`)**:
   - Uses a warm, classical deep-roasted espresso background (`#120e0c`) paired with crema/bronze accents (`#c8a276`) and warm parchment typography (`#f5efe6`). All builder/debug controls and theme toggles were removed so visitors on GitHub see a focused, distraction-free executive presentation.
2. **Editorial Typography (`Playfair Display` + `Plus Jakarta Sans` + `JetBrains Mono`)**:
   - Combines classical serif headings with high-legibility body text and monospace metadata.
3. **Pure CSS3 `preserve-3d` Portrait Choreography**:
   - Eliminates heavy background WebGL circle wireframes and focuses 3D depth on your portrait:
     - **Stage 1 (Top)**: Portrait front and center in a multi-layer 3D frame.
     - **Stage 2 (Scroll Down)**: Portrait glides to the left column while your Executive Summary appears on the right.
     - **Stage 3 (Full Details)**: Portrait transitions into the sticky left sidebar as a **3D circular avatar** while Experience, Projects, Skills, Education, Achievements, and Text Me unfold.
4. **Triple-Layer "Text Me" Email Delivery (`backend/server.js` + `js/app.js`)**:
   - **Full-Stack Mode (`POST /api/contact`)**: Uses **Express** and **Nodemailer** (matching your resume stack!) to send formatted HTML emails straight to `arbajahmad1089@gmail.com` with `replyTo` set to the visitor's email.
   - **GitHub Pages Static Mode**: Automatically relays via FormSubmit AJAX (`https://formsubmit.co/ajax/arbajahmad1089@gmail.com`) and provides a 1-click `mailto:arbajahmad1089@gmail.com` handoff so messages reach your inbox even on static hosting.

---

## 3. How to Run & Deploy

### Option A: Host on GitHub Pages (Zero Setup)
1. Push the contents of this folder to your GitHub repository (`arbajify.github.io` or any repo with GitHub Pages enabled).
2. The **Text Me** form works out of the box via `formsubmit.co` and `mailto:arbajahmad1089@gmail.com` (the first time someone submits on a live domain, FormSubmit sends a 1-click activation email to `arbajahmad1089@gmail.com`).

### Option B: Run Full-Stack Node.js + Nodemailer Backend
1. Copy `.env.example` to `.env` and add your Gmail 16-character App Password (`SMTP_PASS`).
2. Install dependencies and start the server:
   ```bash
   npm install
   npm start
   ```
3. Open `http://localhost:5000`. All **Text Me** submissions will be sent directly via `/api/contact` using Nodemailer.
