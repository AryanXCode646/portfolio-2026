# Aryan Saxena - Portfolio Website

A modern, high-performance, interactive portfolio website showcasing skills in **Artificial Intelligence, Voice Systems, LLM Agentic Workflows, and Full-Stack Web Development**.

---

## 🌟 Key Features

- **Midnight Glassmorphism Design**: Futuristic cyberpunk / dark theme with glowing neon cyan/violet accents and a light/dark theme switch.
- **Interactive Background Constellation**: Custom HTML5 Canvas particle engine that subtly reacts to mouse movements and adjusts with theme changes.
- **Dynamic Skills Hub**:
  - Categorized tabs (*AI & Machine Learning*, *Full-Stack & Web*, *Backend & Systems*, *DevOps & Tools*).
  - Real-time search filter query (type any technology to filter instantly).
  - Animated proficiency meters and experience counters.
- **Project Deep Dives**: Detailed showcases for projects like **MONOPOLY Windows Voice & Vision AI Assistant**, **NeuroFlow Agent Engine**, and **Nexus AI Dashboard** with modals and tech stacks.
- **Embedded Developer Terminal**: Interactive CLI allowing recruiters and developers to test commands (`help`, `skills --ai`, `project monopoly`, `whoami`, `sudo hire`).
- **Interactive Contact Form**: Direct email client integration and 1-click clipboard copy for email.
- **Zero-Dependency & Lightning Fast**: Pure modern ES6+ JavaScript, CSS3, and HTML5 with instant load times.

---

## 🚀 How to Run Locally

You can run this portfolio locally using any standard static server or simply opening `index.html` in your browser.

### Option 1: Using Python (Recommended)
```powershell
cd portfolio
python -m http.server 3000
```
Then open `http://localhost:3000` in your web browser.

### Option 2: Using Node.js / `npx serve`
```powershell
npx serve portfolio
```

### Option 3: Direct Browser
Double-click `portfolio/index.html` in Windows File Explorer.

---

## 📁 Project Structure

```text
portfolio/
├── index.html          # Main HTML structure with semantic sections
├── css/
│   └── style.css       # Glassmorphism, animations, dark/light themes, responsive layout
├── js/
│   ├── data.js         # Structured data for skills, projects, bio, and timeline
│   ├── particles.js    # Interactive canvas particle/constellation engine
│   ├── terminal.js     # Embedded interactive CLI simulator
│   └── main.js         # Theme toggle, search filtering, modals, and toasts
└── README.md           # Documentation
```

---

## 🛠️ How to Customize Your Info

All data (skills, projects, bio, stats, and links) is neatly organized inside [`js/data.js`](js/data.js):

1. **Update Bio & Links**: Edit `portfolioData.personal` in `js/data.js` to update your email, GitHub, LinkedIn, or personal bio.
2. **Add/Edit Skills**: Add new skill objects to `portfolioData.skills` with custom tags, levels, and descriptions.
3. **Add New Projects**: Add new project entries to `portfolioData.projects` with your project highlights, badges, and repo URLs.

---

## 🌐 Free Deployment Options

### Deploy to GitHub Pages:
1. Push this folder to a GitHub repository.
2. In the repository settings, go to **Pages** > select branch **main** / root folder (or `portfolio/`) > click **Save**.

### Deploy to Vercel or Netlify:
1. Drag and drop the `portfolio` folder to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) for instant global CDN deployment with HTTPS.
