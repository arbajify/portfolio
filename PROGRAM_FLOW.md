# Program Architecture & Execution Flow (`PROGRAM_FLOW.md`)

---

## 1. Boot & Rendering Sequence

```text
[index.html]
   ├─► Loads css/styles.css (Heritage Espresso variables & 3-stage 3D CSS classes)
   ├─► Loads js/icons.js    (Official SVG brand logos for Java, Python, React, Node.js, Redis, BullMQ, Nodemailer, etc.)
   ├─► Loads js/data.js     (Structured resume data from Arbaj Ahmad.pdf)
   └─► Executes js/app.js   (Renders sections without builder clutter, binds scroll & 3D tilt listeners)
```

---

## 2. 3-Stage Scroll-Driven Portrait Flow

1. **Stage 1 (`scrollY < 90px`)**:
   - `#hero-stage-grid.stage-1` centers `#hero-portrait-card` in a 3D perspective stage (`perspective: 1300px`).
2. **Stage 2 (`90px <= scrollY < 480px`)**:
   - `#hero-stage-grid.stage-2` shifts into a 2-column grid (`5fr 7fr`), gliding the 3D portrait to the left and revealing `#hero-summary-panel` on the right.
3. **Stage 3 (`scrollY >= 480px`)**:
   - `document.body.classList.add("in-stage-3")` activates the sticky left sidebar's **3D circular avatar** (`#sidebar-circle-avatar-3d`) while Experience, Projects, Skills, Education, Achievements, and the **Text Me** section scroll into view.

---

## 3. "Text Me" Email Delivery Flow (`js/app.js` -> `backend/server.js`)

```text
[Visitor clicks "Text Me — Send to My Email"]
       │
       ▼
1. js/app.js validates { name, email, subject, message }
       │
       ├─► Attempt 1: POST /api/contact (Node.js + Express + Nodemailer server)
       │      └──► backend/server.js dispatches HTML email to arbajahmad1089@gmail.com
       │
       ├─► Attempt 2 (Static GitHub Pages fallback): POST https://formsubmit.co/ajax/arbajahmad1089@gmail.com
       │      └──► Relays message directly to arbajahmad1089@gmail.com
       │
       └─► Instant Backup Link: Generates pre-filled mailto:arbajahmad1089@gmail.com?subject=...&body=...
```
