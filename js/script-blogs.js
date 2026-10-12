/* ================== Blog Reader, Filter & Real-Time Search ================== */

document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------
    // 1. Unified Blog Filter & Real-Time Search Logic
    // -------------------------------------------------------------
    const blogFilterBtns = document.querySelectorAll(".blog-filter-btn");
    const blogItems = document.querySelectorAll(".blog-item");
    const blogSearchInput = document.getElementById("blog-search");

    let activeBlogCategory = "all";
    let blogSearchQuery = "";

    const filterArticles = () => {
        blogItems.forEach(item => {
            const categories = (item.getAttribute("data-category") || "").toLowerCase().split(" ");
            const title = (item.getAttribute("data-title") || "").toLowerCase();
            const textContent = item.textContent.toLowerCase();

            // Category match (or "all")
            const matchesCat = (activeBlogCategory === "all") || categories.includes(activeBlogCategory);

            // Search query match across title or card body
            const matchesSearch = !blogSearchQuery || title.includes(blogSearchQuery) || textContent.includes(blogSearchQuery);

            if (matchesCat && matchesSearch) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    };

    // Category button handling
    blogFilterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const currentActive = document.querySelector(".blog-filter-btn.active");
            if (currentActive) {
                currentActive.classList.remove("active");
            }
            btn.classList.add("active");

            activeBlogCategory = (btn.getAttribute("data-category") || "all").toLowerCase();
            filterArticles();
        });
    });

    // Live search input handling
    if (blogSearchInput) {
        blogSearchInput.addEventListener("input", (e) => {
            blogSearchQuery = e.target.value.toLowerCase().trim();
            filterArticles();
        });
    }

    // -------------------------------------------------------------
    // 2. Interactive Blog Article Reader Overlay Logic
    // -------------------------------------------------------------
    const readerOverlay = document.getElementById("blog-reader");
    const closeReaderBtn = document.getElementById("close-blog-reader");
    const readerTitle = document.getElementById("reader-title");
    const readerCategory = document.getElementById("reader-category");
    const readerDate = document.getElementById("reader-date");
    const readerTime = document.getElementById("reader-time");
    const readerBody = document.getElementById("reader-body");
    const readerTags = document.getElementById("reader-tags");

    // Open Reader using explicit data-article lookup
    const openReader = (articleKey) => {
        const article = blogArticles[articleKey] || blogArticles["portfolio-build"];
        if (!article || !readerOverlay) return;

        readerTitle.textContent = article.title;
        readerCategory.textContent = article.category;
        readerDate.textContent = article.date;
        readerTime.textContent = article.readTime;
        readerBody.innerHTML = article.content;

        if (readerTags) {
            readerTags.innerHTML = article.tags.map(tag => `<span class="tag">${tag}</span>`).join(" ");
        }

        readerOverlay.classList.remove("hidden");
        readerOverlay.scrollTop = 0;
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    };

    const closeReader = () => {
        if (!readerOverlay) return;
        readerOverlay.classList.add("hidden");
        document.body.style.overflow = ""; // Restore background scroll
    };

    // Attach listeners to both Grid "Read More" and Featured "Read Article" buttons
    document.querySelectorAll(".blog-card .btn-link, .featured-blog-content .read-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const articleKey = btn.getAttribute("data-article");
            openReader(articleKey);
        });
    });

    if (closeReaderBtn) {
        closeReaderBtn.addEventListener("click", closeReader);
    }

    // Close when clicking background outside article container
    if (readerOverlay) {
        readerOverlay.addEventListener("click", (e) => {
            if (e.target === readerOverlay) {
                closeReader();
            }
        });
    }

    // Close overlay on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && readerOverlay && !readerOverlay.classList.contains("hidden")) {
            closeReader();
        }
    });
});