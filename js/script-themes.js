
/* ================== Style Switcher Script ================== */
document.addEventListener("DOMContentLoaded", () => {
    const styleSwitcher = document.querySelector(".style-switcher");
    const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
    const dayNight = document.querySelector(".day-night");
    const navPosBtns = document.querySelectorAll(".nav-pos-btn");
    const colorDots = document.querySelectorAll(".colors .color-dot");

    if (!styleSwitcher || !styleSwitcherToggle) return;

    // 1. Toggle Switcher Panel
    styleSwitcherToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        styleSwitcher.classList.toggle("open");
    });

    // Close when clicking outside panel
    document.addEventListener("click", (e) => {
        if (!styleSwitcher.contains(e.target)) {
            styleSwitcher.classList.remove("open");
        }
    });

    // 2. Accent Color Switcher
    const applySkinColor = (color) => {
        document.documentElement.style.setProperty("--skin-color", color);
        localStorage.setItem("selected-skin-color", color);

        colorDots.forEach(dot => {
            dot.classList.toggle("active", dot.getAttribute("data-color") === color);
        });
    };

    colorDots.forEach(dot => {
        dot.addEventListener("click", () => {
            const color = dot.getAttribute("data-color");
            if (color) applySkinColor(color);
        });
    });

    // 3. Dark / Light Mode Toggle
    const applyThemeMode = (mode) => {
        const isDark = mode === "dark";
        document.body.classList.toggle("dark", isDark);
        localStorage.setItem("theme-mode", isDark ? "dark" : "light");

        const icon = dayNight.querySelector("i");
        if (icon) {
            icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
        }
    };

    if (dayNight) {
        dayNight.addEventListener("click", () => {
            const currentMode = document.body.classList.contains("dark") ? "light" : "dark";
            applyThemeMode(currentMode);
        });
    }

    // 4. Navigation Position Switcher (Left vs Right)
    const applyNavPosition = (pos) => {
        document.body.classList.toggle("aside-right", pos === "right");
        localStorage.setItem("nav-position", pos);

        navPosBtns.forEach(btn => {
            btn.classList.toggle("active", btn.getAttribute("data-pos") === pos);
        });
    };

    navPosBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const pos = btn.getAttribute("data-pos");
            applyNavPosition(pos);
        });
    });

    // 5. Restore Preferences on Initial Load
    const savedColor = localStorage.getItem("selected-skin-color") || "#ec1839";
    applySkinColor(savedColor);

    const savedTheme = localStorage.getItem("theme-mode");
    if (savedTheme) {
        applyThemeMode(savedTheme);
    }

    const savedNavPos = localStorage.getItem("nav-position") || "left";
    applyNavPosition(savedNavPos);
});