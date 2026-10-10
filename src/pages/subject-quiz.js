import "../main.js";
import { SubjectSidebar } from "../components/subject-sidebar.js";
import { getQuizQuestions } from "../data/quiz-questions.js";
import { getSubjectFromUrl } from "../data/subjects.js";
import { quizPageUrl } from "../utils/routes.js";

const subject = getSubjectFromUrl();
const params = new URLSearchParams(window.location.search);
const quizId = params.get("quiz") ?? "weekly-1";
const weeklyNumber = Number(quizId.replace("weekly-", ""));
const quizNumberWords = ["الأول", "الثاني", "الثالث", "الرابع", "الخامس"];
const lessonNumberWords = ["الأولى", "الثانية", "الثالثة", "الرابعة", "الخامسة"];
const quizName = quizId === "final"
    ? "الاختبار النهائي"
    : Number.isInteger(weeklyNumber) && weeklyNumber >= 1 && weeklyNumber <= 5
        ? `الاختبار الأسبوعي ${quizNumberWords[weeklyNumber - 1]} (على المحاضرة ${lessonNumberWords[weeklyNumber - 1]})`
        : null;
const pageType = window.location.pathname.endsWith("quiz-mcq.html")
    ? "mcq"
    : window.location.pathname.endsWith("quiz-true-false.html")
        ? "trueFalse"
        : "start";
const pageTitle = pageType === "mcq" ? "أسئلة الاختيار من متعدد" : pageType === "trueFalse" ? "أسئلة الصح والخطأ" : "بدء الاختبار";
const sidebar = document.querySelector("#subject-sidebar");
const content = document.querySelector("#quiz-content");

if (!quizName) {
    throw new Error(`Unknown quiz: ${quizId}`);
}

if (!(sidebar instanceof HTMLElement) || !(content instanceof HTMLElement)) {
    throw new Error("The quiz page is missing its page containers.");
}

document.title = `${pageTitle} | ${subject.name} | المنبر`;
sidebar.innerHTML = SubjectSidebar(subject, "quiz", "", quizId);

const storageKey = `menbar-quiz-${subject.slug}-${quizId}`;
const savedAnswers = JSON.parse(sessionStorage.getItem(storageKey) ?? "{}");
const questionType = pageType === "trueFalse" ? "trueFalse" : "mcq";
const questions = pageType === "start" ? [] : getQuizQuestions(subject.slug, questionType);

const breadcrumb = `
    <nav class="mb-6 text-sm text-text-muted">
        <a href="/subjects/content.html?subject=${subject.slug}" class="underline">${subject.name}</a>
        <span aria-hidden="true">‹</span>
        <span>${quizName}</span>
    </nav>
`;

function renderStartPage() {
    content.innerHTML = `
        ${breadcrumb}
        <h1 class="mb-4 border-b-2 border-gray-400 pb-3 text-center text-xl font-bold text-text-main sm:text-right">
            ${quizName}
        </h1>
        <ul class="mb-7 list-disc space-y-1 px-5 text-text-muted">
            <li>يحتوي هذا الاختبار على 10 أسئلة من نوع الاختيار من متعدد والصح والخطأ.</li>
            <li>لديك محاولتان متبقيتان، وتُحتسب الدرجة الأعلى من المحاولات.</li>
            <li>درجة هذا الاختبار من 10، وتُضاف إلى درجتك في المقرر.</li>
        </ul>
        <div class="mb-6 flex flex-col gap-4 border-b border-gray-300 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p class="font-bold text-text-main">ابدأ في حل ${quizName} ${quizId === "final" ? "على جميع ما تم دراسته سابقًا" : ""}</p>
                <p class="mt-1 text-sm text-text-muted">المحاولات المتبقية: 2</p>
            </div>
            <a href="${quizPageUrl("quiz-mcq", subject.slug, quizId)}" class="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-7 font-bold text-white">
                ابدأ الاختبار الآن
            </a>
        </div>
        <div class="flex flex-col justify-between gap-3 border-b border-gray-300 py-5 sm:flex-row">
            <span class="font-bold text-text-main">درجة الاختبار</span>
            <span class="text-text-main">الدرجة السابقة: 7/10</span>
        </div>
        <div class="mt-7 flex flex-wrap justify-start gap-6 text-sm text-text-muted">
            <button type="button" class="hover:text-primary">أعجبني</button>
            <button type="button" class="hover:text-primary">لم يعجبني</button>
            <button type="button" class="hover:text-primary">تبليغ عن مشكلة</button>
        </div>
    `;
}

function questionCard(question, index) {
    const questionNumber = pageType === "trueFalse" ? index + 6 : index + 1;
    const options = pageType === "trueFalse" ? ["صح", "خطأ"] : question.options;
    const answerName = `${questionType}-${index + 1}`;

    return `
        <fieldset class="mb-3 rounded-sm border border-primary/80 px-4 py-4 sm:px-6 sm:py-5">
            <legend class="sr-only">السؤال ${questionNumber}</legend>
            <p class="mb-3 font-bold text-text-main">${questionNumber}- ${question.question}</p>
            <div class="flex flex-col items-start gap-1">
                ${options
                    .map(
                        (option, optionIndex) => {
                            const inputId = `${answerName}-option-${optionIndex + 1}`;
                            return `
                                <label for="${inputId}" class="flex cursor-pointer items-center gap-2 text-text-muted">
                                    <input
                                        id="${inputId}"
                                        type="radio"
                                        name="${answerName}"
                                        value="${option}"
                                        ${savedAnswers[answerName] === option ? "checked" : ""}
                                        class="size-4 accent-primary"
                                    />
                                    <span>${option}</span>
                                </label>
                            `;
                        },
                    )
                    .join("")}
            </div>
        </fieldset>
    `;
}

function renderQuestionPage() {
    const isTrueFalse = pageType === "trueFalse";
    const questionsTitle = isTrueFalse ? "أسئلة الصح والخطأ" : "أسئلة الاختيار من متعدد";

    content.innerHTML = `
        ${breadcrumb}
        <h1 class="mb-4 border-b-2 border-gray-400 pb-3 text-center text-xl font-bold text-text-main sm:text-right">
            ${quizName}
        </h1>
        <div class="mb-5 text-left text-sm text-text-muted">
            <p class="font-bold text-text-main">${questionsTitle}</p>
            <p>مجموع الأسئلة: 5</p>
        </div>
        <form id="quiz-answers">
            ${questions.map(questionCard).join("")}
            <div class="mt-7 flex flex-wrap items-center gap-4">
                ${
                    isTrueFalse
                        ? `<button type="submit" class="min-h-11 rounded-full bg-primary px-7 font-bold text-white">سجل إجاباتك</button>`
                        : `<a href="${quizPageUrl("quiz-true-false", subject.slug, quizId)}" class="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-7 font-bold text-white">التالي</a>`
                }
                <button type="button" id="clear-answers" class="font-bold text-text-muted underline">حذف جميع الإجابات</button>
            </div>
        </form>
    `;

    const answerForm = document.querySelector("#quiz-answers");
    const clearButton = document.querySelector("#clear-answers");

    if (!(answerForm instanceof HTMLFormElement) || !(clearButton instanceof HTMLButtonElement)) {
        throw new Error("The quiz answer controls could not be loaded.");
    }

    answerForm.addEventListener("change", (event) => {
        const target = event.target;
        if (target instanceof HTMLInputElement && target.checked) {
            savedAnswers[target.name] = target.value;
            sessionStorage.setItem(storageKey, JSON.stringify(savedAnswers));
        }
    });

    clearButton.addEventListener("click", () => {
        for (const question of [...answerForm.querySelectorAll('input[type="radio"]')]) {
            question.checked = false;
        }
        sessionStorage.removeItem(storageKey);
        for (const key of Object.keys(savedAnswers)) {
            delete savedAnswers[key];
        }
    });

    if (isTrueFalse) {
        answerForm.addEventListener("submit", (event) => {
            event.preventDefault();
        });
    }
}

if (pageType === "start") {
    renderStartPage();
} else {
    renderQuestionPage();
}
