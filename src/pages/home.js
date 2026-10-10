import "../main.js";

const ratingForm = document.querySelector("#rating-form");

if (!(ratingForm instanceof HTMLFormElement)) {
    throw new Error("The home page is missing its rating form.");
}

ratingForm.addEventListener("submit", (event) => {
    event.preventDefault();
});
