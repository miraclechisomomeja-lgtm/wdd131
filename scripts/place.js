const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;



const temp = 8;
const wind = 12;

function calculateWindChill(temp, wind) {
    return 13.12 + (0.6215 * temp) - (11.37 * Math.pow(wind, 0.16)) + (0.3965 * temp * Math.pow(wind, 0.16));
}

if (temp <= 10 && wind > 4.8) {
    const windChill = calculateWindChill(temp, wind);
    document.querySelector("#windchill").textContent = `${windChill.toFixed(1)} °C`;
} else {
    document.querySelector("#windchill").textContent = "N/A"
}