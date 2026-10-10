import bellIcon from "../assets/icons/bell-icon.svg";
import profileImage from "../assets/images/profile.png";

export function SiteHeader() {
    return `
        <header>
            <nav class="flex flex-col gap-4 bg-secondary px-4 py-4 text-bg shadow-md sm:px-6 md:flex-row md:items-center md:justify-between md:px-8 lg:px-16">
                <a href="/" class="font-ruqaa text-4xl">المنبر</a>
                <div class="order-3 md:order-0">
                    <ul class="flex flex-wrap justify-center gap-x-5 gap-y-2 font-bold lg:gap-x-8">
                        <li><a href="/">الرئيسية</a></li>
                        <li><a href="/#subjects">مقرراتي الدراسية</a></li>
                        <li><a href="/pages/schedule.html">الجدول الدراسي</a></li>
                        <li><a href="/pages/library.html">المكتبة</a></li>
                        <li><a href="/pages/academic-support.html">الدعم الأكاديمي</a></li>
                    </ul>
                </div>
                <div class="flex items-center justify-center gap-4 md:order-3">
                    <button
                        type="button"
                        class="rounded-full p-2"
                        aria-label="الإشعارات"
                    >
                        <img src="${bellIcon}" alt="" class="w-7" />
                    </button>
                    <a
                        href="/pages/my-account.html"
                        class="size-11 overflow-hidden rounded-full"
                        aria-label="الملف الشخصي"
                    >
                        <img src="${profileImage}" alt="" class="size-full object-cover" />
                    </a>
                    <details class="group relative">
                        <summary
                            class="flex size-11 cursor-pointer list-none items-center justify-center rounded-full p-2 [&::-webkit-details-marker]:hidden"
                            aria-label="فتح قائمة الحساب"
                        >
                            <svg
                                class="size-6 transition-transform group-open:rotate-180"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="3"
                                aria-hidden="true"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </summary>
                        <div class="absolute inset-e-0 top-full z-20 mt-3 w-72 overflow-hidden rounded-md border border-primary/30 bg-white text-text-main shadow-xl sm:w-80">
                            <a href="/pages/my-account.html" class="block border-b border-gray-200 px-5 py-3 text-right text-lg transition-colors hover:bg-gray-100">حسابي</a>
                            <a href="/pages/edit-account.html" class="block border-b border-gray-200 px-5 py-3 text-right text-lg transition-colors hover:bg-gray-100">تعديل بيانات الحساب</a>
                            <a href="/pages/change-password.html" class="block border-b border-gray-200 px-5 py-3 text-right text-lg transition-colors hover:bg-gray-100">تغيير كلمة المرور</a>
                            <a href="/pages/my-certificates.html" class="block border-b border-gray-200 px-5 py-3 text-right text-lg transition-colors hover:bg-gray-100">شهاداتي</a>
                            <a href="/pages/my-grades.html" class="block border-b border-gray-200 px-5 py-3 text-right text-lg transition-colors hover:bg-gray-100">درجات الاختبارات</a>
                            <a href="/pages/academic-support.html" class="block border-b border-gray-200 px-5 py-3 text-right text-lg transition-colors hover:bg-gray-100">الدعم الأكاديمي</a>
                            <button type="button" class="block w-full px-5 py-3 text-right text-lg transition-colors hover:bg-gray-100">تسجيل الخروج</button>
                        </div>
                    </details>
                </div>
            </nav>
        </header>
    `;
}
