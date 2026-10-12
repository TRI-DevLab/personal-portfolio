/* ================== Blog Articles Store ================== */
const blogArticles = {
    "portfolio-build": {
        title: "Building My Portfolio Site & Learning Modern Web Dev",
        category: "Web Development",
        date: "August 2026",
        readTime: "7 min read",
        tags: ["#HTML5", "#CSS3", "#JavaScript", "#UI/UX"],
        content: `
            <p>Designing and constructing this portfolio site served as a practical deep-dive into standard browser APIs, responsive layouts without heavy UI frameworks, and clean CSS architecture.</p>
            <h2>Architectural Foundations</h2>
            <p>Rather than relying on bulky site templates, the focus was centered on modular stylesheet isolation, semantic HTML structuring, and accessible interaction states.</p>
            <blockquote>"A well-structured personal site is both a functional resume and living proof of your software engineering standards."</blockquote>
            <h2>Key Implementation Lessons</h2>
            <p>Implementing client-side routing with hash listeners, theme state caching with <code>localStorage</code>, and responsive grid layouts taught me the importance of maintaining predictable CSS specificity and lean DOM structures.</p>
        `
    },
    "courier-management": {
        title: "Lessons From Building a Courier Management System",
        category: "Projects",
        date: "July 2026",
        readTime: "5 min read",
        tags: ["#Python", "#SQLite", "#Tkinter", "#VCL"],
        content: `
            <p>When developing the Courier Management System, my primary goal was to handle parcel tracking, customer records, and status updates reliably across database tables.</p>
            <h2>Database Architecture & Challenges</h2>
            <p>One of the central bottlenecks was latency during customer lookups across growing dataset volumes. By implementing indexed table queries, record retrieval speeds improved significantly.</p>
            <blockquote>"Building real-world applications teaches you more about database integrity and edge cases than theory alone ever can."</blockquote>
            <h2>Key Takeaways</h2>
            <p>Desktop UI development requires careful validation on every entry point to prevent bad data from reaching transactions and crashing the system state.</p>
        `
    },
    "why-software-engineering": {
        title: "Why I Started Learning Software Engineering",
        category: "Programming",
        date: "June 2026",
        readTime: "4 min read",
        tags: ["#Journey", "#Career", "#Learning"],
        content: `
            <p>My journey into computer science began with an innate curiosity about how computer software operates under the hood and coordinates with systems.</p>
            <h2>The Self-Directed Learning Path</h2>
            <p>I started with structured problem-solving, exploring algorithmic thinking, control flow, and building applications from scratch.</p>
            <h2>Long-Term Horizon</h2>
            <p>My goal is to master foundational software engineering practices while exploring artificial intelligence, machine learning pipelines, and robotics hardware interfaces.</p>
        `
    },
    "intro-machine-learning": {
        title: "My Introduction to Machine Learning Concepts",
        category: "AI & Robotics",
        date: "May 2026",
        readTime: "6 min read",
        tags: ["#MachineLearning", "#Python", "#AI", "#DataScience"],
        content: `
            <p>Stepping into machine learning required shifting mental models from deterministic, rule-based programming to probabilistic models trained on feature vectors.</p>
            <h2>Understanding the Pipeline</h2>
            <p>The core challenge in practical machine learning isn't just choosing models—it is preparing clean datasets, normalising inputs, and preventing overfitting.</p>
            <blockquote>"Data quality and feature preparation directly dictate the reliability of model inferences."</blockquote>
            <h2>Next Steps</h2>
            <p>I'm focusing on applying these models to physical and sensory data, specifically bridging robotics telemetry with predictive algorithms.</p>
        `
    },
    "password-security": {
        title: "Password Security & Cryptographic Hashing",
        category: "Cybersecurity",
        date: "April 2026",
        readTime: "5 min read",
        tags: ["#Security", "#Hashing", "#Cryptography"],
        content: `
            <p>A breakdown of why plaintext password storage is fundamentally unacceptable and how modern systems safeguard credentials using one-way cryptographic hashing.</p>
            <h2>Hashing vs Encryption</h2>
            <p>Encryption is two-way (designed to be decrypted with a key), whereas hashing is strictly one-way. Secure applications use adaptive hash algorithms coupled with cryptographic salts to mitigate rainbow table attacks.</p>
            <blockquote>"Security is not a feature added at the end; it must be built into the database schema and protocol design from day one."</blockquote>
        `
    }
};