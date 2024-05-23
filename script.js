// TODO
// 1. Create modals with the projects description and visit website option
// 2. On click on the website, open the project in a new tab

const projectContainer = document.querySelector(".projects-container");
const projectTemplate = document.querySelector(".project-template");
const technologiesContainer = document.querySelector(".technologies-grid");
const technologyTemplate = document.querySelector(".technology-template");

// Open modal
window.addEventListener("click", (e) => {
    const projectCard = e.target.closest(".project-card");

    if (projectCard) {
        const modalOverlay = document.querySelector(".modal-overlay");
        const modalContainer = document.querySelector(".modal-container");
        modalOverlay.classList.add("active");
        modalContainer.classList.add("active");

        const modalProjectDetails = projectCard.querySelector(
            ".modal-project-details"
        );
        const modalProjectName = projectCard.querySelector(
            ".modal-project-title"
        );

        // modalProjectDetails.textContent = projectCard.dataset.details;
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

async function getData(
    jsonFile,
    renderFunction,
    template,
    mainContainer,
    elContainer,
    elName,
    elImg,
    elDetails
) {
    // fetch data from the .json file
    const response = await fetch(jsonFile);
    const data = await response.json();

    renderFunction(
        data,
        template,
        mainContainer,
        elContainer,
        elName,
        elImg,
        elDetails
    );
}

function render(
    data,
    template,
    mainContainer,
    elContainer,
    elName,
    elImg,
    elDetails
) {
    data.forEach((item) => {
        // copy template
        const templateCopy = template.content.cloneNode(true);
        const itemElement = templateCopy.querySelector(elContainer);
        itemElement.dataset.id = item.id;
        itemElement.dataset.link = item.url;
        itemElement.href = item.url;

        const itemName = itemElement.querySelector(elName);
        const itemImage = itemElement.querySelector(elImg);

        itemImage.src = item.img;
        itemName.textContent = item.name;

        if (elDetails) {
            const itemDetails = itemElement.querySelector(elDetails);
            itemDetails.textContent = item.details;
        }

        // append data to the project container
        mainContainer.append(itemElement);
    });
}

function setCurrentYear() {
    const currentYearElemennt = document.querySelector(".current-year");

    // currentYearElemennt.textContent = new Date().getFullYear();
}

const getProjectsData = getData(
    "./projects.json",
    render,
    projectTemplate,
    projectContainer,
    ".project-card",
    ".project-name",
    ".project-img",
    ".project-details"
);

const getTechnologiesData = getData(
    "./technologies.json",
    render,
    technologyTemplate,
    technologiesContainer,
    ".technology",
    ".technology-name",
    ".technology-icon",
    null
);

setCurrentYear();
