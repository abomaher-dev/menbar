import { BookCard } from "../components/book-card.js";
import { books } from "../data/books.js";
import "../main.js";

const bookGrid = document.querySelector("#book-grid");

if (!(bookGrid instanceof HTMLElement)) {
    throw new Error("The library page is missing its book grid.");
}

bookGrid.innerHTML = books.map((book) => BookCard(book)).join("");
