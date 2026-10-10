import "./style.css";
import { SiteFooter } from "./components/site-footer.js";
import { SiteHeader } from "./components/site-header.js";

const headerContainer = document.querySelector("#site-header");
const footerContainer = document.querySelector("#site-footer");

if (!(headerContainer instanceof HTMLElement)) {
    throw new Error("The page is missing its site header container.");
}

headerContainer.innerHTML = SiteHeader();

if (footerContainer instanceof HTMLElement) {
    footerContainer.innerHTML = SiteFooter();
}
