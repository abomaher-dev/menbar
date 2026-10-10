const accountLinks = [
    { href: "/pages/my-account.html", label: "حسابي", page: "account" },
    {
        href: "/pages/my-certificates.html",
        label: "شهاداتي",
        page: "certificates",
    },
    {
        href: "/pages/my-grades.html",
        label: "درجات الاختبارات",
        page: "grades",
    },
];

export function AccountSidebar(activePage) {
    return `
        <aside class="border-b border-gray-200 bg-white px-5 py-5 md:border-b-0 md:border-s md:px-8 md:py-10 md:shadow-[-4px_0_12px_rgba(0,0,0,0.12)]">
            <nav class="flex flex-wrap gap-x-6 gap-y-3 md:flex-col md:gap-5">
                ${accountLinks
                    .map(
                        ({ href, label, page }) => `
                            <a
                                href="${href}"
                                class="flex items-center justify-between gap-3 font-bold ${page === activePage ? "text-primary" : "text-text-main"}"
                                ${page === activePage ? 'aria-current="page"' : ""}
                            >
                                <span>${label}</span>
                                ${page === activePage ? '<span aria-hidden="true">‹</span>' : ""}
                            </a>
                        `,
                    )
                    .join("")}
            </nav>
        </aside>
    `;
}
