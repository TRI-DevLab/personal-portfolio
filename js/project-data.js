/* ================== Project Details Store ================== */
const projectDetails = {
    "courier-management": {
        title: "Courier Management System",
        category: "Desktop Application • Python & SQLite",
        image: "images/projects/courier-preview.jpg", // path to your screenshot
        icon: "fas fa-shipping-fast",
        description: "A complete desktop logistics platform engineered to handle real-time parcel dispatching, shipment tracking, and customer records with local database persistence.",
        challenge: "Handling large datasets with fast lookup queries without freezing the desktop UI. Solved using indexed B-tree lookups in SQLite alongside background thread operations.",
        technologies: ["Python", "SQLite", "Tkinter", "VCL / Delphi", "Matplotlib"],
        liveUrl: "https://github.com/TRI-DevLab", // or your live demo URL
        githubUrl: "https://github.com/TRI-DevLab/Courier-Management-System"
    },
    "student-management": {
        title: "Student Management System",
        category: "Desktop Application • Python",
        image: "images/projects/student-preview.jpg",
        icon: "fas fa-user-graduate",
        description: "An academic administrative tool tracking student enrollments, grading records, course schedules, and automated report generation.",
        challenge: "Ensuring transactional ACID compliance across multiple tables during batch student grade imports.",
        technologies: ["Python", "SQLite", "Data Structures"],
        liveUrl: "https://github.com/TRI-DevLab",
        githubUrl: "https://github.com/TRI-DevLab"
    },
    "portfolio-site": {
        title: "Personal Engineering Portfolio",
        category: "Web Application • Vanilla Frontend",
        image: "assets/images/projects/TRI-DevLab-Portfolio.png",
        icon: "fas fa-globe",
        description: "Custom-architected responsive portfolio built from scratch with zero UI frameworks, featuring modular state management, custom style themes, and dynamic article rendering.",
        challenge: "Coordinating multi-theme stylesheet variables, history hash states, and mobile touch events without third-party libraries.",
        technologies: ["HTML5", "CSS3", "JavaScript", "EmailJS"],
        liveUrl: "https://tri-devlab.github.io/personal-portfolio/",
        githubUrl: "https://github.com/TRI-DevLab/personal-portfolio"
    },
    "weather-dashboard": {
        title: "Interactive Weather Dashboard",
        category: "Web Application • JavaScript API",
        image: "images/projects/weather-preview.jpg",
        icon: "fas fa-cloud-sun",
        description: "Real-time weather tracking application displaying multi-day forecasts, atmospheric pressure, and interactive city geolocation using asynchronous API queries.",
        challenge: "Handling network latency and rate limits gracefully with client-side caching of weather responses.",
        technologies: ["JavaScript (ES6+)", "REST API", "CSS Grid"],
        liveUrl: "https://github.com/TRI-DevLab",
        githubUrl: "https://github.com/TRI-DevLab"
    },
    "ai-chatbot": {
        title: "AI Chatbot Assistant",
        category: "Artificial Intelligence • Python",
        image: "images/projects/chatbot-preview.jpg",
        icon: "fas fa-robot",
        description: "Natural language processing conversational agent designed to parse questions, extract contextual entities, and execute scripted task commands.",
        challenge: "Prompt context token limits and managing conversation state across multi-turn exchanges.",
        technologies: ["Python", "OpenAI API", "NLP"],
        liveUrl: "https://github.com/TRI-DevLab",
        githubUrl: "https://github.com/TRI-DevLab"
    }
};