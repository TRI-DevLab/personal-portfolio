/* ================== Portfolio Filter & Real-Time Search ================== */

document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectItems = document.querySelectorAll(".project-item");
    const projectSearch = document.getElementById("project-search");

    if (!filterButtons.length || !projectItems.length) return;

    let activeFilter = "all";
    let searchQuery = "";

    // Unified filtering function that respects both category tab and search input
    const filterGallery = () => {
        projectItems.forEach(item => {
            const categories = (item.getAttribute("data-category") || "").toLowerCase().split(" ");
            const title = (item.getAttribute("data-title") || "").toLowerCase();
            const textContent = item.textContent.toLowerCase();

            // 1. Category tab match
            const matchesCategory = (activeFilter === "all") || categories.includes(activeFilter);

            // 2. Search query match (checks title or card text)
            const matchesSearch = !searchQuery || title.includes(searchQuery) || textContent.includes(searchQuery);

            // Display item only if it satisfies both criteria
            if (matchesCategory && matchesSearch) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    };

    // Category Filter Button Click Event
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const currentActive = document.querySelector(".filter-btn.active");
            if (currentActive) {
                currentActive.classList.remove("active");
            }
            btn.classList.add("active");

            activeFilter = (btn.getAttribute("data-filter") || "all").toLowerCase();
            filterGallery();
        });
    });

    // Real-Time Search Input Event
    if (projectSearch) {
        projectSearch.addEventListener("input", (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterGallery();
        });
    }
});