const projectContainer = document.querySelector(".projects-container");
const template = document.querySelector(".template");

async function getData() {
    // fetch data from the .json file
    const response = await fetch("projects.json");
    const projects = await response.json();

    render(projects);
}

function render(projects) {
    projects.forEach((project) => {
        // copy template
        const templateCopy = template.content.cloneNode(true);
        const projectElement = templateCopy.querySelector(".project");
        projectElement.dataset.id = project.id;
        projectElement.href = project.url;

        const projectName = projectElement.querySelector(".project-name");
        const projectDetails = projectElement.querySelector(".project-details");
        const projectImage = projectElement.querySelector(".project-img");

        projectName.textContent = project.name;
        projectDetails.textContent = project.details;
        projectImage.src = project.img;

        // append data to the project container
        projectContainer.append(projectElement);
    });
}

function setCurrentYear() {
    const currentYearElemennt = document.querySelector(".current-year");

    currentYearElemennt.textContent = new Date().getFullYear();
}

getData();
setCurrentYear();
