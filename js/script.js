/* ================== Typing Effect & Dynamic Copyright ================== */

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------------------------------------
    // 1. Dynamic Footer Copyright Year
    // -------------------------------------------------------------
    const yearSpan = document.getElementById("footer-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // -------------------------------------------------------------
    // 2. Coordinated Typing Animation
    // -------------------------------------------------------------
    const typingElement = document.querySelector(".typing");
    if (!typingElement) return;

    const phrases = [
        "Software Developer",
        "AI & Robotics Enthusiast",
        "Cybersecurity Explorer"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            // Remove character
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add character
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        // Typing speed variations
        let typeSpeed = isDeleting ? 45 : 85;

        // If whole phrase is typed
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2200; // Pause at end of phrase
            isDeleting = true;
        } 
        // If phrase is completely erased
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400; // Brief pause before starting next word
        }

        setTimeout(typeLoop, typeSpeed);
    }

    // Coordinate with Splash Screen:
    // If the splash screen is visible, delay starting until user enters
    const splashScreen = document.getElementById("devlab-splash");
    const hasEntered = sessionStorage.getItem("devlab-entered") === "true";

    if (!splashScreen || hasEntered) {
        // Start immediately if returning user or splash is absent
        setTimeout(typeLoop, 300);
    } else {
        // Listen for the entry/skip click so it starts fresh on Home
        const enterBtn = document.getElementById("enter-lab-btn");
        const skipBtn = document.getElementById("skip-splash-btn");

        const startTyping = () => {
            setTimeout(typeLoop, 500);
        };

        if (enterBtn) enterBtn.addEventListener("click", startTyping, { once: true });
        if (skipBtn) skipBtn.addEventListener("click", startTyping, { once: true });
    }
});