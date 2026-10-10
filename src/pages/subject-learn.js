import "../main.js";
import profileImage from "../assets/images/profile.png";
import { SubjectSidebar } from "../components/subject-sidebar.js";
import { getSubjectFromUrl } from "../data/subjects.js";

const subject = getSubjectFromUrl();
const params = new URLSearchParams(window.location.search);
const requestedLesson = params.get("lesson");
const lesson = subject.lessons.find(({ id }) => id === requestedLesson) ?? subject.lessons[0];
const lessonIndex = subject.lessons.indexOf(lesson);
const nextLesson = subject.lessons[lessonIndex + 1];
const sidebar = document.querySelector("#subject-sidebar");
const content = document.querySelector("#lesson-content");

if (!(sidebar instanceof HTMLElement) || !(content instanceof HTMLElement)) {
    throw new Error("The lesson page is missing its page containers.");
}

document.title = `${lesson.shortTitle} | ${subject.name} | المنبر`;
sidebar.innerHTML = SubjectSidebar(subject, "learn", lesson.id);

const sampleComment =
    "السلام عليكم ورحمة الله وبركاته. جزاك الله خيرًا على شرح المحاضرة، وبارك الله في علمك. هل يمكن توضيح هذه النقطة بمثال آخر؟";
const comments = [
    { name: "عبدالله (طالب)", time: "منذ ساعتين", votes: "5" },
    { name: "الشيخ محمد محمد (شيخ متمكن)", time: "منذ يوم", votes: "4" },
    { name: "الشيخ سعد", time: "منذ ساعتين", votes: "2" },
    { name: "أحمد (طالب)", time: "منذ 3 أيام", votes: "4" },
    { name: "الشيخ محمد محمد (شيخ متمكن)", time: "منذ أسبوعين", votes: "4" },
];

content.innerHTML = `
    <nav class="mb-5 text-sm text-text-muted">
        <a href="/subjects/content.html?subject=${subject.slug}" class="underline">${subject.name}</a>
        <span aria-hidden="true">‹</span>
        <span>${lesson.shortTitle}</span>
    </nav>
    <article>
        <h1 class="mb-4 border-b border-gray-300 pb-3 text-xl font-bold text-text-main">
            ${lesson.title}
        </h1>
        <p class="mb-5 leading-7 text-text-muted">${lesson.description}</p>
        <div class="relative flex aspect-video items-center justify-center overflow-hidden rounded-md bg-linear-to-br from-slate-900 via-slate-800 to-primary text-white">
            <div class="text-center">
                <span class="mb-3 inline-flex size-16 items-center justify-center rounded-full bg-red-600 text-2xl" aria-hidden="true">▶</span>
                <p class="font-bold">فيديو المحاضرة</p>
                <p class="mt-1 text-sm text-white/70">سيتم إضافة الفيديو عند توفره</p>
            </div>
        </div>
        <div class="my-6 flex flex-col items-center gap-2">
            <p class="font-bold text-text-main">انتهت المشاهدة؟</p>
            <a
                href="${nextLesson ? `/subjects/learn.html?subject=${subject.slug}&lesson=${nextLesson.id}` : `/subjects/content.html?subject=${subject.slug}`}"
                class="rounded-full bg-primary px-8 py-2 font-bold text-white"
            >
                ${nextLesson ? "المحاضرة التالية" : "العودة إلى المنهج"}
            </a>
            <a href="/subjects/quiz-start.html?subject=${subject.slug}&quiz=weekly-${lessonIndex + 1}" class="text-sm text-text-muted underline">الاختبار الأسبوعي ${["الأول", "الثاني", "الثالث", "الرابع", "الخامس"][lessonIndex]}</a>
        </div>
    </article>
    <section class="mt-8 border-t border-gray-300 pt-6">
        <h2 class="text-xl font-bold text-text-main">منتدى المناقشات</h2>
        <p class="mb-5 mt-1 text-sm text-text-muted">إذا كان لديك أي سؤال أو تعليق تود أن تطرحه يمكنك ذلك</p>
        <form class="mb-5 flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-start">
            <img src="${profileImage}" alt="" class="size-9 rounded-full object-cover" />
            <textarea rows="2" placeholder="أضف تعليقًا أو سؤالًا ..." class="min-h-12 flex-1 resize-y rounded-md border border-gray-200 px-3 py-2"></textarea>
            <button type="button" class="rounded-md bg-primary px-5 py-2 font-bold text-white">إرسال</button>
        </form>
        <div class="flex flex-col gap-4">
            ${comments
                .map(
                    ({ name, time, votes }, index) => `
                        <article class="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:gap-5">
                            <div class="flex flex-col items-center gap-1 rounded-md bg-gray-50 px-2 py-2 text-sm">
                                <button type="button" aria-label="تصويت إيجابي" class="font-bold text-primary">+</button>
                                <span>${votes}</span>
                                <button type="button" aria-label="تصويت سلبي" class="font-bold text-primary">−</button>
                            </div>
                            <div class="min-w-0">
                                <div class="mb-2 flex flex-wrap items-center gap-2">
                                    <img src="${profileImage}" alt="" class="size-8 rounded-full object-cover" />
                                    <p class="font-bold text-text-main">${name}</p>
                                    <span class="text-sm text-text-muted">${time}</span>
                                </div>
                                <p class="leading-7 text-text-main">${index % 2 === 0 ? sampleComment : "جزاك الله خيرًا، استفدت كثيرًا من شرح هذه المحاضرة. نفع الله بكم."}</p>
                                <button type="button" class="mt-3 text-sm font-bold text-primary">رد</button>
                            </div>
                        </article>
                    `,
                )
                .join("")}
        </div>
    </section>
`;
