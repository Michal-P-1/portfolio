function setCurrentYear() {
    console.log("Setting current year");
    const currentYearElemennt = document.querySelector(".current-year");
    console.log(currentYearElemennt);

    currentYearElemennt.textContent = new Date().getFullYear();
}

setCurrentYear();
