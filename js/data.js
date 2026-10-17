/* ==========================================================================
   Portfolio Data Store — Parsed from Arbaj Ahmad.pdf
   Clean production dataset for GitHub deployment
   ========================================================================== */

window.PORTFOLIO_DATA = {
  profile: {
    name: "Arbaj Ahmad",
    title: "Full-Stack Software & Machine Learning Engineer",
    location: "Lucknow, India",
    degree: "B.Tech in Computer Science Engineering (Aug. 2023 – July 2027)",
    university: "Integral University, Lucknow",
    summary: "Computer Science Engineering undergraduate at Integral University (2023 – 2027) and former In-house AI/ML Intern at Sipher Web Pvt Ltd. Experienced in building full-stack MERN applications (ProShop-v2), asynchronous event-driven notification engines with Redis and BullMQ, and machine learning classification pipelines in Python and Scikit-learn.",
    phone: "+91-8318218595",
    email: "arbajahmad1089@gmail.com",
    linkedin: "https://www.linkedin.com/in/arbajahmad000",
    github: "https://github.com/arbajify"
  },

  education: [
    {
      institution: "Integral University",
      location: "Lucknow, India",
      degree: "Bachelor’s of Technology in Computer Science Engineering",
      period: "Aug. 2023 – July 2027"
    },
    {
      institution: "Samta IC Lachhiya",
      location: "Kushinagar, India",
      degree: "Intermediate",
      period: "2021"
    }
  ],

  experience: [
    {
      company: "Sipher Web Pvt Ltd",
      role: "In-house Internship",
      location: "Lucknow, India",
      period: "May 2025 – July 2025",
      stack: ["Python", "Scikit-learn", "NLP / TF-IDF"],
      bullets: [
        "Developed an AI-based ML model for spam email detection.",
        "Developed an ML-based system to classify emails as Spam or Ham using Python and Scikit-learn.",
        "Applied NLP preprocessing and TF-IDF vectorization to extract meaningful features from email text.",
        "Trained and evaluated classification models using accuracy, precision, recall, and F1-score.",
        "Built an automated prediction pipeline that analyzes email content and detects potential spam messages."
      ]
    }
  ],

  projects: [
    {
      id: "proshop-v2",
      title: "ProShop-v2",
      status: "Full-Stack E-Commerce",
      stack: ["MongoDB", "Express", "React", "Node.js", "JWT", "RestAPI"],
      bullets: [
        "Developed a full-stack e-commerce application with a responsive React.js frontend and Node.js/Express.js backend.",
        "Implemented user authentication and authorization using JWT, including protected routes and role-based access for users/admins.",
        "Built RESTful APIs for products, users, orders, reviews, and payments, enabling seamless frontend-backend communication.",
        "Implemented shopping cart, product search/filtering, checkout, order management, and product reviews functionality."
      ]
    },
    {
      id: "event-notification-engine",
      title: "Event Driven Notification Engine (In-Progress)",
      status: "Asynchronous Architecture",
      stack: ["Express", "MongoDB", "React", "Redis", "BullMQ", "Nodemailer"],
      bullets: [
        "Developing an event-driven notification system using Node.js/Express.js to process and deliver notifications asynchronously.",
        "Implementing Redis and BullMQ-based job queues for background processing, improving reliability and preventing notification tasks from blocking API requests.",
        "Building REST APIs and MongoDB data models to manage notification events, users, templates, and delivery status.",
        "Integrating Nodemailer for automated email notifications and developing a React-based interface for monitoring and managing notification workflows."
      ]
    }
  ],

  skills: [
    { name: "Java", category: "Languages" },
    { name: "Python", category: "Languages" },
    { name: "C/C++", category: "Languages" },
    { name: "SQL (Postgres)", category: "Languages" },
    { name: "JavaScript", category: "Languages" },
    { name: "HTML/CSS", category: "Languages" },
    { name: "React", category: "Frameworks" },
    { name: "Node.js", category: "Frameworks" },
    { name: "RestAPI", category: "Frameworks" },
    { name: "Redis", category: "Frameworks" },
    { name: "Git", category: "Developer Tools" },
    { name: "Docker", category: "Developer Tools" },
    { name: "Visual Studio Code", category: "Developer Tools" },
    { name: "Express", category: "Libraries" },
    { name: "Mongoose", category: "Libraries" },
    { name: "Nodemailer", category: "Libraries" },
    { name: "Scikit-learn", category: "Libraries" },
    { name: "BullMQ", category: "Libraries" },
    { name: "MongoDB", category: "Libraries" }
  ],

  achievements: [
    {
      title: "Data Structures and Algorithms",
      metric: "50 Problems Solved",
      description: "Solved 50 problems across different platforms."
    }
  ]
};
