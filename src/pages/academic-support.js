import "../main.js";
const supportForm = document.querySelector("#support-form");
const attachmentInput = document.querySelector("#attachment");
const attachmentName = document.querySelector("#attachment-name");

if (!(supportForm instanceof HTMLFormElement)) {
    throw new Error("The academic support page is missing its form.");
}

if (!(attachmentInput instanceof HTMLInputElement) || !(attachmentName instanceof HTMLElement)) {
    throw new Error("The attachment input or its filename display is missing.");
}

supportForm.addEventListener("submit", (event) => {
    event.preventDefault();
});

attachmentInput.addEventListener("change", () => {
    attachmentName.textContent =
        attachmentInput.files?.[0]?.name ?? "لم يتم اختيار ملف";
});
