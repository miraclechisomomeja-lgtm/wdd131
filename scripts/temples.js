const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("nav ul");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuButton.classList.toggle("open");
});


const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;
