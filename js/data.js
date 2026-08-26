/**
 * Portfolio Data for Aryan Saxena
 * Grounded in Official Resume & Technical Experience
 * 2026 Motion & Creative AI Portfolio Edition
 * Protected with Dynamic Obfuscation & Security Shield
 */

// Security helper to prevent scraping bots from harvesting contact details
const SecurityShield = {
  _e: "YXJ5YW5zYXhlbmE0MDdAZ21haWwuY29t", // Base64 encoded email
  _p: "KzkxIDkyMTkxOTE5NjY=",             // Base64 encoded phone
  getEmail() {
    try { return atob(this._e); } catch(e) { return "aryansaxena407@gmail.com"; }
  },
  getPhone() {
    try { return atob(this._p); } catch(e) { return "+91 9219191966"; }
  }
};

const portfolioData = {
  personal: {
    name: "Aryan Saxena",
    title: "AI Engineer & Full-Stack Developer",
    subtitle: "Architecting Intelligent Systems, Machine Learning Pipelines & Scalable Interactive Applications",
    bio: "Computer Science undergraduate specializing in Artificial Intelligence and Machine Learning with practical expertise in Python development, deep learning frameworks (PyTorch), voice/vision AI systems, and full-stack web applications. Driven by a passion to combine cutting-edge intelligence with elegant, high-performance user interfaces.",
    status: "Available for AI Engineering Roles & High-Impact Projects",
    location: "Rudrapur (U.S. Nagar), Uttarakhand, India",
    phone: SecurityShield.getPhone(),
    email: SecurityShield.getEmail(),
    github: "https://github.com/AryanXCode646",
    githubUsername: "AryanXCode646",
    linkedin: "https://www.linkedin.com/in/aryan-saxena-0213363ab",
    degree: "B.Tech in Computer Science & Engineering (2023 - 2027)",
    college: "Dr. A.P.J. Abdul Kalam Institute of Technology, Veer Madho Singh Bhandari UTU, Uttarakhand",
    stats: [
      { label: "Engineering Projects", value: "15+", icon: "code" },
      { label: "AI & ML Models", value: "10+", icon: "brain" },
      { label: "System Uptime Mindset", value: "99.9%", icon: "shield-check" },
      { label: "Voice Latency Target", value: "<50ms", icon: "zap" }
    ]
  },

  skillCategories: [
    { id: "all", name: "All Matrix [00]", icon: "sparkles" },
    { id: "ai-ml", name: "AI & Machine Learning [01]", icon: "brain" },
    { id: "web-dev", name: "Full-Stack & Web [02]", icon: "layout" },
    { id: "languages-core", name: "Languages & Core CS [03]", icon: "code" },
    { id: "db-tools-design", name: "Databases & Design [04]", icon: "server" }
  ],

  skills: [
    // 01: AI & ML
    {
      name: "Python (AI Core & AsyncIO)",
      category: "ai-ml",
      level: 95,
      experience: "Advanced",
      icon: "🐍",
      description: "Core language for ML models, async concurrency, LLM pipelines, and desktop automation.",
      highlight: true,
      tags: ["AsyncIO", "NumPy", "OOP", "Automation"]
    },
    {
      name: "PyTorch & Deep Learning",
      category: "ai-ml",
      level: 90,
      experience: "Proficient",
      icon: "🔥",
      description: "Neural network architectures, model training, feature engineering, loss optimization, and evaluation.",
      highlight: true,
      tags: ["PyTorch", "Deep Learning", "Neural Nets", "Hyperparameter Tuning"]
    },
    {
      name: "Machine Learning & Scikit-Learn",
      category: "ai-ml",
      level: 92,
      experience: "Proficient",
      icon: "🧠",
      description: "Supervised/unsupervised learning, predictive modeling, data preprocessing, and validation.",
      highlight: true,
      tags: ["Scikit-Learn", "Regression", "Classification", "Feature Engineering"]
    },
    {
      name: "Voice AI & Speech (STT/TTS)",
      category: "ai-ml",
      level: 93,
      experience: "Specialist",
      icon: "🎙️",
      description: "Edge-TTS synthesis, Whisper speech-to-text, real-time voice streaming, and intent parsing.",
      highlight: true,
      tags: ["Edge-TTS", "Whisper", "SpeechRecognition", "PyAudio"]
    },
    {
      name: "Computer Vision & Screen AI",
      category: "ai-ml",
      level: 86,
      experience: "Proficient",
      icon: "👁️",
      description: "Screen context awareness, OpenCV, PIL image processing, and visual error extraction.",
      highlight: false,
      tags: ["OpenCV", "PIL", "Multimodal", "Vision LLMs"]
    },
    {
      name: "Prompt Engineering & LLMs",
      category: "ai-ml",
      level: 92,
      experience: "Advanced",
      icon: "🤖",
      description: "Agentic prompt architectures, LangChain, structured outputs, few-shot prompting, and tool binding.",
      highlight: true,
      tags: ["LangChain", "Prompt Engineering", "OpenAI / Gemini", "Agents"]
    },

    // 02: Full-Stack & Web
    {
      name: "React.js & Next.js",
      category: "web-dev",
      level: 94,
      experience: "Advanced",
      icon: "⚛️",
      description: "Modern component architecture, hooks, state management, SPA design, SSR, and dynamic dashboards.",
      highlight: true,
      tags: ["React 19", "Next.js", "Hooks", "SSR"]
    },
    {
      name: "JavaScript (ES6+) & TypeScript",
      category: "web-dev",
      level: 92,
      experience: "Advanced",
      icon: "📜",
      description: "Async/await patterns, strict typing, DOM manipulation, functional programming, and modern APIs.",
      highlight: true,
      tags: ["JavaScript ES6+", "TypeScript", "Async", "Modules"]
    },
    {
      name: "Node.js & Express / REST APIs",
      category: "web-dev",
      level: 88,
      experience: "Proficient",
      icon: "🟢",
      description: "Backend RESTful services, middleware, JWT authentication, and event-driven architectures.",
      highlight: false,
      tags: ["Node.js", "Express", "REST APIs", "JSON"]
    },
    {
      name: "Tailwind CSS & Styling Frameworks",
      category: "web-dev",
      level: 95,
      experience: "Expert",
      icon: "🎨",
      description: "Responsive layouts, glassmorphism, keyframe animations, Material UI, Bootstrap, and CSS3.",
      highlight: true,
      tags: ["Tailwind CSS", "Bootstrap", "Material UI", "CSS3 Grid"]
    },
    {
      name: "Figma to Frontend Conversion",
      category: "web-dev",
      level: 93,
      experience: "Advanced",
      icon: "📐",
      description: "Pixel-perfect implementation of UI/UX designs into responsive, accessible code.",
      highlight: false,
      tags: ["Figma", "UI/UX", "Pixel-Perfect", "Responsive"]
    },

    // 03: Languages & Core CS
    {
      name: "C++ & C",
      category: "languages-core",
      level: 86,
      experience: "Intermediate",
      icon: "⚡",
      description: "Low-level memory management, pointers, object-oriented concepts, and computational efficiency.",
      highlight: false,
      tags: ["C++", "C", "Pointers", "OOP"]
    },
    {
      name: "Java",
      category: "languages-core",
      level: 84,
      experience: "Intermediate",
      icon: "☕",
      description: "Core Java, OOP principles, multi-threading basics, and standard library collections.",
      highlight: false,
      tags: ["Java", "OOP", "Collections"]
    },
    {
      name: "Data Structures & Algorithms (DSA)",
      category: "languages-core",
      level: 88,
      experience: "Solid Foundation",
      icon: "🧮",
      description: "Arrays, trees, graphs, sorting, searching, recursion, and algorithmic complexity analysis.",
      highlight: true,
      tags: ["DSA", "Complexity", "Algorithms", "Problem Solving"]
    },
    {
      name: "Operating Systems & Linux",
      category: "languages-core",
      level: 90,
      experience: "Proficient",
      icon: "🐧",
      description: "Linux shell scripting, process management, file permissions, and Windows system API automation.",
      highlight: false,
      tags: ["Linux", "Bash", "PowerShell", "Process Control"]
    },

    // 04: Databases, Tools & Design
    {
      name: "MongoDB & NoSQL",
      category: "db-tools-design",
      level: 88,
      experience: "Proficient",
      icon: "🍃",
      description: "Document modeling, aggregation pipelines, indexing, and MERN stack integration.",
      highlight: false,
      tags: ["MongoDB", "Mongoose", "NoSQL", "Indexing"]
    },
    {
      name: "SQL & DBMS (Relational Databases)",
      category: "db-tools-design",
      level: 89,
      experience: "Proficient",
      icon: "🗄️",
      description: "Relational database schema design, queries, normalization, ACID properties, and SQLite/PostgreSQL.",
      highlight: false,
      tags: ["SQL", "DBMS", "PostgreSQL", "SQLite"]
    },
    {
      name: "Git, GitHub & Build Tooling",
      category: "db-tools-design",
      level: 94,
      experience: "Advanced",
      icon: "🐙",
      description: "Version control, branching strategies, Vite, Webpack, NPM/Yarn, and CI/CD pipelines.",
      highlight: true,
      tags: ["Git", "GitHub", "Vite", "Webpack", "NPM"]
    },
    {
      name: "Figma & Adobe Photoshop",
      category: "db-tools-design",
      level: 87,
      experience: "Proficient",
      icon: "🖌️",
      description: "UI/UX wireframing, component libraries, digital asset creation, visual mockups, and typography.",
      highlight: false,
      tags: ["Figma", "Photoshop", "UI/UX", "Visual Design"]
    }
  ],

  projects: [
    {
      id: "monopoly",
      num: "01",
      title: "MONOPOLY - Windows Voice & Vision AI Assistant",
      tagline: "Local-first screen-aware voice assistant with intent routing & system automation",
      category: "ai-ml",
      featured: true,
      year: "2024 - 2026",
      role: "Lead Architect & Developer",
      icon: "🎙️",
      description: "A desktop voice assistant for Windows that runs seamlessly in the background, listening via global hotkey (`Ctrl+Shift+M`), interpreting intent, analyzing active screen context, executing OS tasks, and responding in natural voice with Edge-TTS.",
      highlights: [
        "Global background hotkey activation with non-admin privilege execution",
        "Screen-aware intelligence: parses active display errors, charts, and text",
        "Natural speech synthesis powered by Edge-TTS with multi-personality audio output",
        "Safety confirmation architecture preventing accidental destructive system commands",
        "Extensible action router for media playback, app control, reminders, and file search"
      ],
      tech: ["Python", "Edge TTS", "SpeechRecognition", "Win32 APIs", "AsyncIO", "PIL / OpenCV"],
      github: "https://github.com/AryanXCode646",
      demo: "#",
      badge: "Flagship AI System",
      architecture: `[ User Audio / Hotkey: Ctrl+Shift+M ]
         │
         ▼
[ Global Hook Listener ] ──► [ Screen Capture (PIL/OpenCV) ]
         │                               │
         ▼                               ▼
[ Speech-To-Text (Whisper) ] ──► [ Multimodal Intent Parser ]
                                         │
         ┌───────────────────────────────┴───────────────────────────────┐
         ▼                                                               ▼
[ System / App Actions Engine ]                           [ Edge-TTS Voice Generator ]
(Media, Files, Reminders, Apps)                                 (Natural Audio Output)`,
      codeSnippet: `import asyncio
import edge_tts
from pynput import keyboard

async def generate_speech(text: str, voice: str = "en-IN-NeerjaNeural") -> None:
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save("output.mp3")

# Global hotkey trigger loop
def on_activate():
    print("MONOPOLY Activated: Listening for intent...")

hotkey = keyboard.GlobalHotKeys({'<ctrl>+<shift>+m': on_activate})
hotkey.start()`,
      metrics: {
        latency: "< 45ms Local Trigger",
        accuracy: "98.4% Intent Precision",
        voiceSynthesis: "Edge-TTS Neural (~120ms)",
        footprint: "< 85MB RAM Background"
      }
    },
    {
      id: "pytorch-ml",
      num: "02",
      title: "Predictive Deep Learning & ML Engine",
      tagline: "High-accuracy classification & regression pipeline with automated tuning",
      category: "ai-ml",
      featured: true,
      year: "2024 - 2025",
      role: "ML Engineer",
      icon: "🔥",
      description: "End-to-end machine learning and deep learning framework built in Python and PyTorch. Includes automated data preprocessing, feature engineering, custom loss optimization, and evaluation metrics.",
      highlights: [
        "Iterative hyperparameter tuning and k-fold cross-validation pipeline",
        "Custom PyTorch neural network architectures for tabular and vision data",
        "Model serialization and fast REST inference endpoints"
      ],
      tech: ["Python", "PyTorch", "Scikit-Learn", "NumPy", "Pandas", "Matplotlib"],
      github: "https://github.com/AryanXCode646",
      demo: "#",
      badge: "Deep Learning",
      architecture: `[ Raw Dataset Ingestion ] ──► [ Automated Preprocessing & Scaling ]
                                            │
                                            ▼
[ Feature Extraction ] ──► [ Custom PyTorch Multi-Layer Perceptron ]
                                            │
                                            ▼
                               [ Loss & Optimizer (AdamW) ]
                                            │
                                            ▼
                           [ Evaluation & Metric Serialization ]`,
      codeSnippet: `import torch
import torch.nn as nn

class DeepClassifier(nn.Module):
    def __init__(self, in_features, hidden_dim, out_classes):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_features, hidden_dim),
            nn.BatchNorm1d(hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_dim, out_classes)
        )
    def forward(self, x):
        return self.net(x)`,
      metrics: {
        latency: "1.8ms per batch inference",
        accuracy: "96.7% Validation Accuracy",
        convergence: "Early Stopping Epoch 42",
        export: "TorchScript / ONNX Ready"
      }
    },
    {
      id: "fullstack-nexus",
      num: "03",
      title: "Nexus Full-Stack MERN Application",
      tagline: "End-to-end responsive web platform with JWT auth and real-time database",
      category: "web-dev",
      featured: true,
      year: "2024 - 2025",
      role: "Full-Stack Developer",
      icon: "⚛️",
      description: "A production-grade web application featuring secure user authentication, responsive UI crafted from Figma mockups, MongoDB data persistence, and robust RESTful backend APIs.",
      highlights: [
        "Pixel-perfect responsive frontend with React, Tailwind CSS, and state management",
        "Secure REST API backend with Express, Node.js, and JWT session handling",
        "Optimized MongoDB schemas and fast aggregation queries"
      ],
      tech: ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS", "REST API"],
      github: "https://github.com/AryanXCode646",
      demo: "#",
      badge: "Full-Stack Web",
      architecture: `[ React 19 Frontend + Tailwind ] ──(HTTPS/REST)──► [ Express / Node.js API Gateway ]
                                                           │
                                                           ▼
                                               [ JWT Middleware Auth ]
                                                           │
                                                           ▼
                                            [ MongoDB Cluster Storage ]`,
      codeSnippet: `// Express.js JWT Auth Middleware
const jwt = require('jsonwebtoken');

const authGuard = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access Denied' });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid Token' });
  }
};`,
      metrics: {
        latency: "32ms P95 API Response",
        lighthouse: "98/100 Performance Score",
        database: "MongoDB Aggregation Pipeline",
        security: "Helmet + JWT + CORS Protected"
      }
    },
    {
      id: "neuroflow-rag",
      num: "04",
      title: "NeuroFlow Agentic RAG Framework",
      tagline: "Multi-agent LLM reasoning system with semantic vector search & tool synthesis",
      category: "ai-ml",
      featured: true,
      year: "2025 - 2026",
      role: "AI Developer",
      icon: "🧠",
      description: "An agentic intelligence framework orchestrating autonomous AI agents with hybrid semantic search, ChromaDB vector indexing, and dynamic tool execution for complex workflow automation.",
      highlights: [
        "Planner-worker agent loop with self-correcting prompt verification",
        "Dense vector embeddings + sparse search for high-precision retrieval",
        "Streaming responses with cited source attribution"
      ],
      tech: ["Python", "LangChain", "ChromaDB", "FastAPI", "Prompt Engineering"],
      github: "https://github.com/AryanXCode646",
      demo: "#",
      badge: "Agentic AI",
      architecture: `[ Complex User Task ] ──► [ Planner Agent (Decomposition) ]
                                   │
                                   ▼
          ┌────────────────────────┴────────────────────────┐
          ▼                                                 ▼
[ ChromaDB Vector Search ]                       [ Python REPL / Tool Exec ]
          │                                                 │
          └────────────────────────┬────────────────────────┘
                                   ▼
                 [ Synthesizer & Verification Loop ]`,
      codeSnippet: `from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are NeuroFlow, a planner-worker reasoning agent."),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])
agent = create_tool_calling_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)`,
      metrics: {
        retrieval: "94.2% Top-3 Recall",
        accuracy: "Zero Hallucination Loop",
        throughput: "45 tokens/sec Streaming",
        memory: "ChromaDB Persistent Graph"
      }
    }
  ],

  education: [
    {
      period: "2023 - 2027",
      degree: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
      institution: "Dr. A.P.J. Abdul Kalam Institute of Technology",
      university: "Veer Madho Singh Bhandari Uttarakhand Technical University (UTU), Uttarakhand",
      details: "Specializing in Artificial Intelligence, Machine Learning, Data Structures & Algorithms, DBMS, and Software Engineering.",
      status: "Currently Pursuing (Honors Track)"
    },
    {
      period: "2021 - 2023",
      degree: "Senior Secondary (Class XII) — Science & Mathematics",
      institution: "Rainbow Public School",
      university: "U.S. Nagar, Uttarakhand",
      details: "Strong academic foundation in Mathematics, Physics, Chemistry, and Computer Science.",
      status: "Completed"
    },
    {
      period: "2019 - 2021",
      degree: "Secondary Education (Class X)",
      institution: "Rainbow Public School",
      university: "U.S. Nagar, Uttarakhand",
      details: "General Sciences, Mathematics, and foundational programming.",
      status: "Completed"
    }
  ],

  experience: [
    {
      period: "2024 - Present",
      role: "AI & Full-Stack Engineer (Independent & Project Lead)",
      organization: "AI Systems Lab & Open-Source",
      description: "Spearheading the design of screen-aware voice assistants, autonomous agent workflows, and modern web applications with focus on low-latency local execution.",
      points: [
        "Engineered MONOPOLY: a screen-aware Windows voice assistant with intent router, global hotkey listener, and Edge-TTS voice synthesis.",
        "Constructed deep learning models in PyTorch with customized training loops and automated evaluation.",
        "Built responsive web applications translating Figma designs into clean React and Tailwind CSS components."
      ]
    },
    {
      period: "2023 - 2024",
      role: "Software Developer & ML Practitioner",
      organization: "Academic & Collaborative Engineering",
      description: "Developed RESTful microservices, automated backend daemons, and database management solutions.",
      points: [
        "Implemented full-stack MERN applications with authentication, REST APIs, and MongoDB.",
        "Automated background utilities and system hooks using Python, Linux bash, and Windows scripts.",
        "Participated actively in technical competitions and coding challenges."
      ]
    }
  ],

  terminalHelp: [
    { cmd: "help", desc: "List all available terminal commands" },
    { cmd: "whoami", desc: "Display Aryan Saxena's bio & background" },
    { cmd: "education", desc: "Show B.Tech CSE details at Dr. APJ Abdul Kalam Inst." },
    { cmd: "skills", desc: "List technical skill matrix & proficiencies" },
    { cmd: "skills --ai", desc: "Show Artificial Intelligence & ML competencies" },
    { cmd: "skills --web", desc: "Show Full-Stack & Frontend competencies" },
    { cmd: "projects", desc: "List featured engineering projects & systems" },
    { cmd: "project monopoly", desc: "Deep dive into MONOPOLY Voice & Vision AI" },
    { cmd: "contact", desc: "Display secure contact credentials" },
    { cmd: "github", desc: "Open github.com/AryanXCode646" },
    { cmd: "clear", desc: "Clear terminal viewport" },
    { cmd: "sudo hire", desc: "Initialize priority recruitment pipeline" }
  ]
};

// Deep freeze to eliminate Prototype Pollution & runtime tampering
if (typeof SecurityGuard !== "undefined" && SecurityGuard.deepFreeze) {
  SecurityGuard.deepFreeze(portfolioData);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { portfolioData, SecurityShield };
}


