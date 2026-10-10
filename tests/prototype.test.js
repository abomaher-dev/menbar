import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getQuizQuestions } from "../src/data/quiz-questions.js";
import { subjects } from "../src/data/subjects.js";
import { books } from "../src/data/books.js";
import { quizPageUrl } from "../src/utils/routes.js";

test("quiz navigation URLs target the subject quiz pages", () => {
    assert.equal(
        quizPageUrl("quiz-mcq", "tafseer", "weekly-1"),
        "/subjects/quiz-mcq.html?subject=tafseer&quiz=weekly-1",
    );
    assert.equal(
        quizPageUrl("quiz-true-false", "hadith", "final"),
        "/subjects/quiz-true-false.html?subject=hadith&quiz=final",
    );
});

test("each subject has five questions in both quiz sections", () => {
    for (const { slug } of subjects) {
        assert.equal(
            getQuizQuestions(slug, "mcq").length,
            5,
            `${slug} MCQ count`,
        );
        assert.equal(
            getQuizQuestions(slug, "trueFalse").length,
            5,
            `${slug} true/false count`,
        );
    }
});

test("the tafseer book uses the uploaded test PDF and other books have no PDF link", () => {
    const tafseerBook = books.find(({ subject }) => subject === "التفسير");

    assert.ok(tafseerBook?.pdfUrl);
    assert.equal(tafseerBook.pdfUrl, "/books/serah.pdf");
    assert.ok(
        existsSync(new URL(`../public${tafseerBook.pdfUrl}`, import.meta.url)),
    );
    assert.equal(
        books.some(({ subject }) => subject === "السيرة النبوية"),
        false,
    );
    assert.ok(
        books
            .filter(({ subject }) => subject !== "التفسير")
            .every(({ pdfUrl }) => !pdfUrl),
    );
});

test("both grade views list five weekly quizzes and six assessments", () => {
    const subjectGrades = readFileSync(
        new URL("../src/pages/subject-information.js", import.meta.url),
        "utf8",
    );
    const accountGrades = readFileSync(
        new URL("../pages/my-grades.html", import.meta.url),
        "utf8",
    );

    for (const [name, source] of [
        ["subject grades", subjectGrades],
        ["account grades", accountGrades],
    ]) {
        assert.equal(
            [...source.matchAll(/الاختبار الأسبوعي/g)].length,
            5,
            `${name} weekly count`,
        );
        assert.match(source, /الاختبار النهائي/, `${name} final exam`);
        assert.match(source, /2\/6/, `${name} total assessment count`);
    }
});
