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

// -------------------------------------------------------------
// Interactive Project Details Modal
// -------------------------------------------------------------
const projectModal = document.getElementById("project-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalBody = document.getElementById("modal-body");

const openProjectModal = (projectKey) => {
    const data = projectDetails[projectKey];
    if (!data || !projectModal || !modalBody) return;

    modalBody.innerHTML = `
        <div class="modal-preview-img">
            ${data.image 
                ? `<img src="${data.image}" alt="${data.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"><div class="modal-preview-placeholder" style="display:none;"><i class="${data.icon}"></i></div>` 
                : `<div class="modal-preview-placeholder"><i class="${data.icon}"></i></div>`}
        </div>

        <div class="modal-header-info">
            <span class="modal-cat">${data.category}</span>
            <h3>${data.title}</h3>
        </div>

        <p>${data.description}</p>

        <div class="modal-challenge-box">
            <strong><i class="fas fa-lightbulb"></i> Engineering Challenge & Solution:</strong><br>
            ${data.challenge}
        </div>

        <div class="modal-tech-stack">
            ${data.technologies.map(t => `<span class="badge">${t}</span>`).join("")}
        </div>

        <div class="modal-actions">
            <a href="${data.liveUrl}" class="btn" target="_blank" rel="noopener noreferrer">
                <i class="fas fa-external-link-alt"></i> Launch Live Application
            </a>
            <a href="${data.githubUrl}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-github"></i> Inspect Codebase
            </a>
        </div>
    `;

    projectModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
};

const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove("active");
    document.body.style.overflow = "";
};

// Event delegation for all Live Demo triggers
document.addEventListener("click", (e) => {
    const demoBtn = e.target.closest(".open-project-modal");
    if (demoBtn) {
        e.preventDefault();
        const projectKey = demoBtn.getAttribute("data-project");
        openProjectModal(projectKey);
    }
});

// Close listeners (X button, backdrop click, and Escape key)
if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeProjectModal);
}

if (projectModal) {
    projectModal.addEventListener("click", (e) => {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectModal && projectModal.classList.contains("active")) {
        closeProjectModal();
    }
});