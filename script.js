// TODO
// 3. Add a 404 page
// 4. Try and catch for fetch

const technologiesContainer = document.querySelector(".technologies-grid");
const technologyTemplate = document.querySelector(".technology-template");
const headerEmail = document.querySelector(".header-email");

headerEmail.addEventListener("click", () => {
    window.location = "mailto:m.podolak14@gmail.com";
});

// Open modal
window.addEventListener("click", async (e) => {
    const projectCard = e.target.closest(".project-card");

    if (projectCard) {
        const modalOverlay = document.querySelector(".modal-overlay");
        const modalContainer = document.querySelector(".modal-container");

        modalOverlay.classList.add("active");
        modalContainer.classList.add("active");

        const modalProjectTitle = document.querySelector(
            ".modal-project-title"
        );
        const modalProjectDescription = document.querySelector(
            ".modal-project-description"
        );
        const modalProjectImage = document.querySelector(".modal-project-img");
        const modalProjectLink = document.querySelector(".modal-project-link");
        const modalLoader = document.querySelector(".modal-loader");

        modalProjectTitle.textContent = "";
        modalProjectDescription.textContent = "";
        modalProjectImage.src = "";
        modalProjectLink.textContent = "";
        // Show loader
        modalLoader.classList.add("show");

        // Fetch data
        const projectTarget = await getProjectDetails(projectCard.dataset.id);

        if (!projectTarget) {
            modalProjectTitle.textContent = "Project not found";
            modalProjectDescription.textContent =
                "The project you are looking for is not available at the moment. Please try again later.";
            modalProjectLink.textContent = "Back to Home";
            modalProjectLink.href = "/";
        } else {
            modalProjectImage.src = projectTarget.img;
            // Img loaded - remove loader
            modalLoader.classList.remove("show");

            modalProjectTitle.textContent = projectTarget.title;
            modalProjectDescription.textContent = projectTarget.description;
            modalProjectLink.textContent = "Visit Project";
            modalProjectLink.href = projectTarget.url;
        }

        // modalProjectDetails.textContent = card.dataset.cardDetails;
    }
});

// Close modal
window.addEventListener("click", (e) => {
    const modalOverlay = document.querySelector(".modal-overlay");
    const modalContainer = document.querySelector(".modal-container");
    const closeModal =
        e.target.closest(".modal-close") || e.target.matches(".modal-overlay");

    if (closeModal) {
        modalOverlay.classList.remove("active");
        modalContainer.classList.remove("active");
    }
});

async function getProjectDetails(targetId) {
    const data = await getData("./projects.json");
    const targetData = data.find((item) => item.id === Number(targetId));
    return targetData;
}

// setCurrentYear();

async function getData(jsonFile) {
    // fetch data from the .json file
    try {
        const response = await fetch(jsonFile);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data", error);
    }

    return data;
}

async function render(typePlural, type) {
    const data = await getData(`./${typePlural}.json`);
    const template = document.querySelector(`.${type}-template`);
    const container =
        document.querySelector(`.${typePlural}-container`) ||
        document.querySelector(`.${typePlural}-grid`);

    if (!data) {
        console.error("Error fetching data");
    } else {
        data.forEach((item) => {
            const templateCopy = template.content.cloneNode(true);
            const card = templateCopy.querySelector(`.${type}-card`);
            card.dataset.id = item.id;
            const cardTitle = card.querySelector(`.${type}-title`);
            const cardImage = card.querySelector(`.${type}-img`);
            const cardDetails = card.querySelector(`.${type}-details`);

            cardImage.src = item.img;
            cardTitle.textContent = item.title;
            if (type === "project") {
                cardDetails.textContent = item.details;
            }

            // append data to the project container
            container.append(card);
        });
    }
}

const getAndRenderProjects = render("projects", "project");
const getAndRenderTechnologies = render("technologies", "technology");
