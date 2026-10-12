/* ================== Navigation & Section Switching Engine ================== */

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".aside .nav li a");
    const sections = document.querySelectorAll(".section");
    const aside = document.querySelector(".aside");
    const navTogglerBtn = document.querySelector(".nav-toggler");
    const readerOverlay = document.getElementById("blog-reader");

    // Close Mobile Sidebar Helper
    const closeMobileNav = () => {
        if (aside && aside.classList.contains("open")) {
            aside.classList.remove("open");
            if (navTogglerBtn) navTogglerBtn.classList.remove("open");
        }
    };

    // Central Section Switching Function
    const showSection = (targetId, updateHash = true) => {
        const targetSection = document.getElementById(targetId);
        if (!targetSection || !targetSection.classList.contains("section")) return;

        // 1. Dismiss Blog Reader Overlay if open
        if (readerOverlay && !readerOverlay.classList.contains("hidden")) {
            readerOverlay.classList.add("hidden");
            document.body.style.overflow = "";
        }

        // 2. Synchronize Sidebar Active Link State
        navLinks.forEach(link => {
            const hrefTarget = link.getAttribute("href").replace("#", "");
            link.classList.toggle("active", hrefTarget === targetId);
        });

        // 3. Switch Section Visibility with Entrance Animation
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove("hidden");
                // Force DOM reflow to re-trigger sectionFadeIn keyframe
                void section.offsetWidth;
                section.classList.add("active");
            } else {
                section.classList.remove("active");
                section.classList.add("hidden");
            }
        });

        // 4. Update Browser URL Hash without Jump
        if (updateHash && window.location.hash.replace("#", "") !== targetId) {
            history.pushState(null, "", `#${targetId}`);
        }

        // 5. Smooth Scroll to Top of Viewport
        window.scrollTo({ top: 0, behavior: "smooth" });

        // 6. Close mobile menu if open
        closeMobileNav();
    };

    // -------------------------------------------------------------
    // Link Click Event Handling (Nav, Footer, Internal CTAs)
    // -------------------------------------------------------------
    document.addEventListener("click", (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;

        const href = link.getAttribute("href");
        const targetId = href.replace("#", "").trim();

        // Ignore empty '#' links (e.g. dummy buttons, demo triggers)
        if (!targetId) return;

        // Verify that the link actually points to an existing <section>
        const targetSection = document.getElementById(targetId);
        if (targetSection && targetSection.classList.contains("section")) {
            e.preventDefault();
            showSection(targetId);
        }
    });

    // -------------------------------------------------------------
    // Mobile Sidebar Toggler
    // -------------------------------------------------------------
    if (navTogglerBtn && aside) {
        navTogglerBtn.addEventListener("click", () => {
            aside.classList.toggle("open");
            navTogglerBtn.classList.toggle("open");
        });
    }

    // -------------------------------------------------------------
    // Browser Back / Forward Button Navigation (popstate)
    // -------------------------------------------------------------
    window.addEventListener("popstate", () => {
        const hashTarget = window.location.hash.replace("#", "").trim() || "home";
        showSection(hashTarget, false);
    });

    // -------------------------------------------------------------
    // Direct URL Hash Deep-Linking on Initial Load
    // -------------------------------------------------------------
    const initialHash = window.location.hash.replace("#", "").trim();
    if (initialHash && document.getElementById(initialHash)) {
        // If user navigated directly to #portfolio or #about, switch to it
        showSection(initialHash, false);
    }
});