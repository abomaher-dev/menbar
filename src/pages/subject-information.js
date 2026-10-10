import "../main.js";
import bookImage from "../assets/images/book.png";
import teacherImage from "../assets/images/shiekh-mostafa.jpg";
import { books } from "../data/books.js";
import { SubjectSidebar } from "../components/subject-sidebar.js";
import { getSubjectFromUrl } from "../data/subjects.js";

const subject = getSubjectFromUrl();
const pageType = window.location.pathname.split("/").pop()?.replace(".html", "");
const pageDetails = {
    grades: { title: "درجات المقرر", breadcrumb: "درجات المقرر" },
    teachers: { title: "مدرسو المقرر", breadcrumb: "مدرسو المقرر" },
    about: { title: "معلومات عن المنهج", breadcrumb: "معلومات عن المنهج" },
};
const page = pageDetails[pageType];
const sidebar = document.querySelector("#subject-sidebar");
const content = document.querySelector("#subject-page-content");
const book = books.find(({ subject: bookSubject }) => bookSubject === subject.name);

if (!page) {
    throw new Error(`Unknown subject information page: ${pageType}`);
}

if (!(sidebar instanceof HTMLElement) || !(content instanceof HTMLElement)) {
    throw new Error("The subject information page is missing its page containers.");
}

if (!book) {
    throw new Error(`No course book is configured for ${subject.name}.`);
}

document.title = `${page.title} | ${subject.name} | المنبر`;
sidebar.innerHTML = SubjectSidebar(subject, pageType);

const breadcrumb = `
    <nav class="mb-6 text-sm text-text-muted">
        <a href="/subjects/content.html?subject=${subject.slug}" class="underline">${subject.name}</a>
        <span aria-hidden="true">‹</span>
        <span>${page.breadcrumb}</span>
    </nav>
`;

const gradeRows = [
    { title: "الاختبار الأسبوعي الأول", lesson: "على المحاضرة الأولى", score: "8/10", completed: true },
    { title: "الاختبار الأسبوعي الثاني", lesson: "على المحاضرة الثانية", score: "6/10", completed: true },
    { title: "الاختبار الأسبوعي الثالث", lesson: "على المحاضرة الثالثة", score: "لم يتم الحل", completed: false },
    { title: "الاختبار الأسبوعي الرابع", lesson: "على المحاضرة الرابعة", score: "لم يتم الحل", completed: false },
    { title: "الاختبار الأسبوعي الخامس", lesson: "على المحاضرة الخامسة", score: "لم يتم الحل", completed: false },
    { title: "الاختبار النهائي", lesson: "على جميع ما تم دراسته سابقًا", score: "لم يتم الحل", completed: false },
];

function renderGrades() {
    const rows = gradeRows
        .map(
            ({ title, lesson, score, completed }) => `
                <li class="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-gray-300 py-4 sm:gap-5">
                    <span class="flex size-7 items-center justify-center rounded-full ${completed ? "bg-primary" : "bg-gray-400"} text-sm text-white" aria-hidden="true">✓</span>
                    <div>
                        <p class="font-bold text-text-main">${title}</p>
                        <p class="text-sm text-text-muted">${lesson}</p>
                    </div>
                    <p class="w-20 whitespace-pre-line text-center text-sm text-text-muted">${score}</p>
                </li>
            `,
        )
        .join("");

    content.innerHTML = `
        ${breadcrumb}
        <section class="overflow-hidden rounded-md border border-primary/70 bg-white">
            <h1 class="border-b border-primary/60 px-5 py-4 text-xl font-bold text-text-main">${page.title}</h1>
            <div class="px-5 py-3 sm:px-8 sm:py-5">
                <ul>${rows}</ul>
                <dl class="ms-auto mt-6 grid max-w-sm grid-cols-[1fr_auto] gap-x-5 gap-y-2 text-text-main">
                    <dt class="font-bold">مجموع الاختبارات المنتهية</dt>
                    <dd>2/6</dd>
                    <dt class="font-bold">متوسط درجات الاختبارات</dt>
                    <dd>7/10</dd>
                    <dt class="font-bold">درجة الاختبار النهائي</dt>
                    <dd>لم يتم الحل</dd>
                </dl>
            </div>
        </section>
    `;
}

function renderTeachers() {
    const teacherDescription =
        "الشيخ مصطفى العدوي (1954م -) من مواليد قرية منية سمنود التابعة لمركز أجا بمحافظة الدقهلية. حفظ القرآن الكريم في المرحلة الثانوية، ثم التحق بكلية أصول الدين.";

    content.innerHTML = `
        ${breadcrumb}
        <h1 class="mb-8 border-b-2 border-gray-400 pb-3 text-xl font-bold text-text-main">${page.title}</h1>
        <div class="mx-auto flex max-w-3xl flex-col items-center gap-6 py-2 sm:flex-row sm:gap-10">
            <img src="${teacherImage}" alt="الشيخ مصطفى العدوي" class="size-44 shrink-0 rounded-full object-cover sm:size-52" />
            <article class="text-center sm:text-right">
                <h2 class="text-xl font-bold text-text-main">الشيخ مصطفى العدوي</h2>
                <p class="mt-1 font-bold text-text-main">أستاذ وعالم في العلم الشرعي</p>
                <p class="mt-2 leading-6 text-text-muted">${teacherDescription}</p>
                <p class="mt-3 font-bold text-text-main">يدرّس ${subject.name}</p>
            </article>
        </div>
    `;
}

const aboutSections = {
    tafseer: {
        description: "يدرس الطالب في علم التفسير المداخل لعلم التفسير وتفسير سورة الفاتحة وآية الكرسي وخواتيم سورة البقرة.",
        features: [
            "التفاعلية: يتيح المنهج للطلاب فرصة المشاركة والتفاعل من خلال منتديات خاصة لمناقشة المواضيع وطرح الأسئلة.",
            "الشمولية: يقدم المنهج شرحًا شاملًا لجميع جوانب علم التفسير، مما يجعله مناسبًا لطلاب العلم الشرعي والمهتمين بدراسة القرآن الكريم.",
            "الوضوح: يتم شرح جميع المواضيع بطريقة واضحة ومبسطة، مما يجعلها سهلة الفهم للجميع.",
        ],
        outcomes: ["فهم معاني القرآن الكريم وفقه مقاصده.", "تعلم كيفية تفسير القرآن الكريم بالطريقة الصحيحة.", "التعرف على أهم كتب التفسير ومناهجه."],
        excerpts: [
            "علم التفسير من أهم العلوم الشرعية، فهو يبين معاني القرآن الكريم ويفسر مفرداته ويوضح مقاصده.",
            "من أشهر كتب التفسير: تفسير الطبري، وتفسير ابن كثير، وتفسير القرطبي.",
            "سورة الفاتحة أم القرآن، وهي سورة مكية وعدد آياتها سبع آيات.",
        ],
    },
    fiqh: {
        description: "يقدم المنهج مدخلًا إلى علم الفقه وأدلته، ثم يتناول أبوابًا مختارة من العبادات وأحكامها.",
        features: ["التدرج في عرض المسائل الفقهية من المبادئ إلى التطبيقات.", "توضيح الأدلة والمصطلحات الشرعية الأساسية.", "أمثلة تعليمية تساعد على فهم الأحكام وتطبيقها."],
        outcomes: ["التعرف على معنى الفقه ومصادر الأحكام الشرعية.", "فهم المسائل الأساسية في الطهارة والصلاة والصيام.", "استخدام المصطلحات الفقهية في موضعها."],
        excerpts: ["الفقه هو العلم بالأحكام الشرعية العملية المكتسبة من أدلتها التفصيلية.", "الطهارة والصلاة والصيام من أبواب العبادات التي يدرسها الفقه.", "من مصادر الأحكام الشرعية القرآن الكريم والسنة النبوية."],
    },
    aqeedah: {
        description: "يقدم المنهج مدخلًا إلى أصول العقيدة الإسلامية، وأركان الإيمان وما يتصل بها من موضوعات.",
        features: ["عرض أصول الإيمان ومفاهيم العقيدة بترتيب واضح.", "شرح المصطلحات الأساسية مع أمثلة تعليمية.", "ربط موضوعات المنهج بالنصوص الشرعية."],
        outcomes: ["التعرف على أركان الإيمان ومعانيها.", "فهم أصول العقيدة الإسلامية ومصادرها.", "تمييز موضوعات العقيدة الأساسية."],
        excerpts: ["أركان الإيمان ستة، وهي الإيمان بالله وملائكته وكتبه ورسله واليوم الآخر والقدر.", "الإيمان بالرسل ركن من أركان الإيمان.", "تتناول العقيدة أصول الإيمان وما يجب اعتقاده."],
    },
    hadith: {
        description: "يقدم المنهج مدخلًا إلى علم الحديث والسنة النبوية ومصطلحات الرواية والدراية الأساسية.",
        features: ["التعريف بمكانة السنة النبوية وعلم الحديث.", "شرح المصطلحات الحديثية بطريقة مبسطة.", "التعرف على أقسام الحديث ومبادئ دراستها."],
        outcomes: ["فهم مفاهيم الإسناد والمتن والراوي.", "التعرف على أقسام الحديث الأساسية.", "تمييز المبادئ الأولية لقبول الحديث."],
        excerpts: ["السنة النبوية مصدر من مصادر التشريع الإسلامي.", "يتكون الحديث من إسناد ومتن.", "الحديث الصحيح من أقسام الحديث المقبول."],
    },
};

function renderAbout() {
    const details = aboutSections[subject.slug];

    if (!details) {
        throw new Error(`Course information is not configured for ${subject.slug}.`);
    }

    const list = (items) => `<ul class="list-disc space-y-1 pe-5">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;

    content.innerHTML = `
        ${breadcrumb}
        <h1 class="mb-7 border-b-2 border-gray-400 pb-3 text-xl font-bold text-text-main">${page.title}</h1>
        <section class="border-b border-gray-200 pb-6">
            <h2 class="font-ruqaa text-5xl text-text-main">${subject.name}</h2>
            <h3 class="mt-1 font-bold text-text-main">التعريف بعلم ${subject.name}</h3>
            <p class="mt-2 leading-7 text-text-muted">${details.description}</p>
        </section>
        <section class="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 border-b border-gray-200 py-6 sm:gap-8">
            <img src="${teacherImage}" alt="الشيخ مصطفى العدوي" class="size-20 rounded-full object-cover sm:size-24" />
            <p class="text-text-main">يدرّس بواسطة: <a href="/subjects/teachers.html?subject=${subject.slug}" class="font-bold text-blue-700 underline">الشيخ مصطفى العدوي</a></p>
        </section>
        <section class="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 border-b border-gray-200 py-6 sm:gap-8">
            <img src="${bookImage}" alt="غلاف كتاب ${book.title}" class="h-28 w-20 object-contain sm:h-36 sm:w-28" />
            <p class="text-text-main">كتاب المقرر: ${
                book.pdfUrl
                    ? `<a href="${book.pdfUrl}" target="_blank" rel="noopener" class="font-bold text-blue-700 underline">${book.title}</a>`
                    : `<span class="font-bold">${book.title}</span>`
            }</p>
        </section>
        <section class="space-y-7 py-6 leading-7 text-text-muted">
            <div>
                <h2 class="mb-2 font-bold text-text-main">عن المنهج</h2>
                <p>${details.description} ويتناول المنهج هذه الموضوعات من خلال دروس وأنشطة تعليمية متدرجة.</p>
            </div>
            <div>
                <h2 class="mb-2 font-bold text-text-main">ما الذي يميز هذا المنهج؟</h2>
                ${list(details.features)}
            </div>
            <div>
                <h2 class="mb-2 font-bold text-text-main">ما الذي ستتعلمه من هذا المنهج؟</h2>
                ${list(details.outcomes)}
            </div>
            <div>
                <h2 class="mb-2 font-bold text-text-main">مقتطفات من محتوى المنهج</h2>
                ${list(details.excerpts)}
            </div>
        </section>
    `;
}

if (pageType === "grades") {
    renderGrades();
} else if (pageType === "teachers") {
    renderTeachers();
} else {
    renderAbout();
}
