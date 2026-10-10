import facebookIcon from "../assets/images/facebook.png";
import instagramIcon from "../assets/images/instagram.png";
import telegramIcon from "../assets/images/telegram.png";
import youtubeIcon from "../assets/images/youtube.png";

const socialLinks = [
    { href: "https://telegram.com", name: "Telegram", icon: telegramIcon },
    { href: "https://youtube.com", name: "YouTube", icon: youtubeIcon },
    { href: "https://instagram.com", name: "Instagram", icon: instagramIcon },
    { href: "https://facebook.com", name: "Facebook", icon: facebookIcon },
];

export function SiteFooter() {
    return `
        <footer class="grid grid-cols-1 justify-items-center gap-8 bg-primary px-4 py-8 text-center text-bg sm:px-6 md:grid-cols-3 md:px-8 lg:px-16">
            <div>
                <a href="/" class="font-ruqaa text-6xl lg:text-7xl">المنبر</a>
            </div>
            <div class="flex flex-col items-center gap-8">
                <div class="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                    <a href="/" class="font-bold text-md">الرئيسية</a>
                    <a href="/#subjects" class="font-bold text-md">مقرراتي الدراسية</a>
                    <a href="/pages/schedule.html" class="font-bold text-md">الجدول الدراسي</a>
                    <a href="/pages/library.html" class="font-bold text-md">المكتبة</a>
                    <a href="/pages/academic-support.html" class="font-bold text-md">الدعم الأكاديمي</a>
                </div>
                <p>جميع الحقوق محفوظة لأكاديمية المنبر 2026©</p>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-5">
                ${socialLinks
                    .map(
                        ({ href, name, icon }) => `
                            <a href="${href}" aria-label="${name}">
                                <img
                                    class="size-10 object-contain brightness-0 invert"
                                    src="${icon}"
                                    alt=""
                                />
                            </a>
                        `,
                    )
                    .join("")}
            </div>
        </footer>
    `;
}
