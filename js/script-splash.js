/* ================== DevLab Splash Screen Protocol ================== */

document.addEventListener("DOMContentLoaded", () => {
    const splashScreen = document.getElementById("devlab-splash");
    const enterBtn = document.getElementById("enter-lab-btn");
    const skipBtn = document.getElementById("skip-splash-btn");
    const navLinks = document.querySelectorAll(".aside .nav li a");
    const sections = document.querySelectorAll(".section");

    if (!splashScreen) return;

    // Check if user already entered during this session
    if (sessionStorage.getItem("devlab-entered") === "true") {
        splashScreen.style.display = "none";
        document.body.classList.remove("splash-active");
        return;
    }

    // Lock page scroll while splash screen is active
    document.body.classList.add("splash-active");

    let isTransitioning = false;

    const triggerEntry = () => {
        if (isTransitioning) return;
        isTransitioning = true;

        if (enterBtn) enterBtn.disabled = true;
        if (skipBtn) skipBtn.disabled = true;

        splashScreen.classList.add("fade-out");
        sessionStorage.setItem("devlab-entered", "true");
        document.body.classList.remove("splash-active");

        // 1. Activate Home Nav Link
        navLinks.forEach(nav => nav.classList.remove("active"));
        const homeNav = document.querySelector('.aside .nav li a[href="#home"]');
        if (homeNav) homeNav.classList.add("active");

        // 2. Show ONLY Home section & hide all others
        sections.forEach(section => {
            if (section.id === "home") {
                section.classList.remove("hidden");
                section.classList.add("active");
            } else {
                section.classList.remove("active");
                section.classList.add("hidden");
            }
        });

        // 3. Remove overlay after transition completes
        setTimeout(() => {
            splashScreen.style.display = "none";
        }, 650);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (enterBtn) enterBtn.addEventListener("click", triggerEntry);
    if (skipBtn) skipBtn.addEventListener("click", triggerEntry);
});