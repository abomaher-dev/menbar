import "../main.js";
import { SubjectSidebar } from "../components/subject-sidebar.js";
import { getSubjectFromUrl } from "../data/subjects.js";

const subject = getSubjectFromUrl();
const sidebar = document.querySelector("#subject-sidebar");
const content = document.querySelector("#subject-content");

if (!(sidebar instanceof HTMLElement) || !(content instanceof HTMLElement)) {
    throw new Error("The subject content page is missing its page containers.");
}

document.title = `${subject.name} | المنبر`;
sidebar.innerHTML = SubjectSidebar(subject, "content");

const lectureRows = subject.lessons
    .map(
        (lesson, index) => `
            <li class="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 py-2">
                <span class="flex size-7 items-center justify-center rounded-full bg-secondary text-sm text-white" aria-hidden="true">✓</span>
                <a href="/subjects/learn.html?subject=${subject.slug}&lesson=${lesson.id}" class="text-text-main">
                    <span class="block font-bold underline">${lesson.title}</span>
                    <span class="block text-sm text-text-muted">${lesson.description}</span>
                </a>
            </li>
            <li class="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 py-2">
                <span class="flex size-7 items-center justify-center rounded-full bg-gray-400 text-sm text-white" aria-hidden="true">✓</span>
                <a href="/subjects/quiz-start.html?subject=${subject.slug}&quiz=weekly-${index + 1}" class="text-text-main">
                    <span class="block font-bold underline">الاختبار الأسبوعي ${["الأول", "الثاني", "الثالث", "الرابع", "الخامس"][index]}</span>
                    <span class="block text-sm text-text-muted">على المحاضرة ${["الأولى", "الثانية", "الثالثة", "الرابعة", "الخامسة"][index]}</span>
                </a>
            </li>
        `,
    )
    .join("");

content.innerHTML = `
    <nav class="mb-6 text-sm text-text-muted">
        <a href="/#subjects" class="underline">المقررات الدراسية</a>
        <span aria-hidden="true">‹</span>
        <span>${subject.name}</span>
    </nav>
    <section class="rounded-md border border-primary/70 bg-white">
        <h1 class="border-b border-primary/50 px-5 py-4 text-xl font-bold text-text-main">
            المنهج الدراسي
        </h1>
        <div class="px-5 py-4 sm:px-8">
            <p class="mb-5 text-text-main">${subject.intro}</p>
            <ul class="divide-y divide-gray-100">${lectureRows}</ul>
            <a
                href="/subjects/learn.html?subject=${subject.slug}&lesson=${subject.lessons[0].id}"
                class="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 font-bold text-white"
            >
                ابدأ الدراسة
            </a>
        </div>
    </section>
`;
