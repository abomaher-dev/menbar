import bookCover from "../assets/images/book.png";

export function BookCard({ subject, title, pdfUrl }) {
    return `
        <article class="flex min-h-72 flex-col items-center rounded-xl border border-gray-400 bg-white px-4 py-5 text-center shadow-sm">
            <h2 class="font-ruqaa text-3xl text-text-main">${subject}</h2>
            <img
                class="my-4 h-28 w-full object-contain"
                src="${bookCover}"
                alt="غلاف كتاب ${title}"
            />
            <p class="mb-4 min-h-12 text-sm font-bold leading-6 text-text-main">
                الكتاب: ${title}
            </p>
            ${pdfUrl ? `
                <div class="mt-auto flex w-full flex-col gap-2">
                    <a
                        href="${pdfUrl}"
                        download
                        class="flex h-9 w-full items-center justify-center rounded-full bg-primary font-bold text-bg"
                    >
                        تحميل الكتاب
                    </a>
                    <a
                        href="${pdfUrl}"
                        target="_blank"
                        rel="noopener"
                        class="flex h-9 w-full items-center justify-center rounded-full border border-primary font-bold text-primary"
                    >
                        عرض الكتاب
                    </a>
                </div>
            ` : `
                <p class="mt-auto w-full rounded-full bg-gray-100 px-3 py-2 text-sm text-text-muted">
                    الكتاب غير متاح في الوقت الحالي
                </p>
            `}
        </article>
    `;
}
