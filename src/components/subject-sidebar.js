const quizNumbers = ["الأول", "الثاني", "الثالث", "الرابع", "الخامس"];
const lessonNumbers = ["الأولى", "الثانية", "الثالثة", "الرابعة", "الخامسة"];

export function SubjectSidebar(subject, activePage, activeLessonId = "", activeQuizId = "") {
    const pageLinks = [
        { label: "المنهج الدراسي", href: `/subjects/content.html?subject=${subject.slug}`, page: "content" },
        { label: "درجات المقررات", href: `/subjects/grades.html?subject=${subject.slug}`, page: "grades" },
        { label: "مدرسو المقرر", href: `/subjects/teachers.html?subject=${subject.slug}`, page: "teachers" },
        { label: "معلومات عن المنهج", href: `/subjects/about.html?subject=${subject.slug}`, page: "about" },
    ];

    const pageNavigation = `
        <nav class="mt-8 flex flex-col gap-2">
            ${pageLinks
                .map(
                    ({ label, href, page }) => `
                        <a
                            href="${href}"
                            class="rounded-sm px-3 py-2 font-bold ${page === activePage ? "bg-gray-100 text-primary" : "text-text-main"}"
                            ${page === activePage ? 'aria-current="page"' : ""}
                        >${label}</a>
                    `,
                )
                .join("")}
        </nav>
    `;

    const navigation = activePage === "learn" || activePage === "quiz"
        ? `
            ${pageNavigation}
            <div class="mt-8">
                <h2 class="mb-3 font-bold text-text-main">رحلتك التعليمية</h2>
                <ul class="flex flex-col gap-2">
                    ${subject.lessons
                        .map(
                            (lesson) => `
                                <li>
                                    <a
                                        href="/subjects/learn.html?subject=${subject.slug}&lesson=${lesson.id}"
                                        class="block rounded-sm px-3 py-2 ${lesson.id === activeLessonId ? "bg-gray-100 font-bold text-primary" : "text-text-main"}"
                                        ${lesson.id === activeLessonId ? 'aria-current="page"' : ""}
                                    >
                                        <span class="block">${lesson.title}</span>
                                        <span class="text-sm text-text-muted">${lesson.shortTitle}</span>
                                    </a>
                                </li>
                            `,
                        )
                        .join("")}
                </ul>
                <h2 class="mb-3 mt-5 border-t border-gray-200 pt-4 font-bold text-text-main">الاختبارات</h2>
                <ul class="flex flex-col gap-2 text-text-muted">
                    ${subject.lessons
                        .map(
                            (_, index) => `
                                <li>
                                    <a
                                        href="/subjects/quiz-start.html?subject=${subject.slug}&quiz=weekly-${index + 1}"
                                        class="block rounded-sm px-3 py-2 ${activeQuizId === `weekly-${index + 1}` ? "bg-gray-200 font-bold text-text-main" : "text-text-main"}"
                                        ${activeQuizId === `weekly-${index + 1}` ? 'aria-current="page"' : ""}
                                    >
                                        <span class="block">الاختبار الأسبوعي ${quizNumbers[index]}</span>
                                        <span class="block text-sm">على المحاضرة ${lessonNumbers[index]}</span>
                                    </a>
                                </li>
                            `,
                        )
                        .join("")}
                    <li>
                        <a
                            href="/subjects/quiz-start.html?subject=${subject.slug}&quiz=final"
                            class="block rounded-sm px-3 py-2 ${activeQuizId === "final" ? "bg-gray-200 font-bold text-text-main" : "font-bold text-text-main"}"
                            ${activeQuizId === "final" ? 'aria-current="page"' : ""}
                        >
                            <span class="block">الاختبار النهائي</span>
                            <span class="block text-sm font-normal">على جميع ما تم دراسته سابقًا</span>
                        </a>
                    </li>
                </ul>
            </div>
        `
        : pageNavigation;

    return `
        <aside class="border-b border-gray-200 bg-white px-5 py-5 md:min-h-full md:border-b-0 md:border-s md:px-6 md:py-8 md:shadow-[-4px_0_12px_rgba(0,0,0,0.12)]">
            <a href="/subjects/content.html?subject=${subject.slug}" class="mb-2 block rounded-full bg-primary px-5 py-3 text-center font-ruqaa text-2xl text-bg">
                ${subject.name}
            </a>
            <p class="mb-4 border-b border-gray-200 pb-4 text-center text-sm text-text-muted">
                التعريف بعلم ${subject.name}
            </p>
            ${navigation}
        </aside>
    `;
}
