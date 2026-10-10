import "../main.js";
import { AccountSidebar } from "../components/account-sidebar.js";

const sidebar = document.querySelector("#account-sidebar");
const activePage = document.body.dataset.accountPage;

if (!(sidebar instanceof HTMLElement)) {
    throw new Error("The account page is missing its sidebar container.");
}

if (
    activePage !== "account" &&
    activePage !== "certificates" &&
    activePage !== "grades"
) {
    throw new Error("The account page has an invalid active navigation item.");
}

sidebar.innerHTML = AccountSidebar(activePage);
