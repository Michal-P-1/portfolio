const projectContainer = document.querySelector(".projects-container");
const projectTemplate = document.querySelector(".project-template");
const technologiesContainer = document.querySelector(".technologies-grid");
const technologyTemplate = document.querySelector(".technology-template");

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

    currentYearElemennt.textContent = new Date().getFullYear();
}

const getProjectsData = getData(
    "./projects.json",
    render,
    projectTemplate,
    projectContainer,
    ".project",
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
