export const subjects = [
    {
        slug: "tafseer",
        name: "التفسير",
        intro: "يدرس الطالب في علم التفسير المداخل لعلم التفسير وتفسير السور والآيات القرآنية.",
        lessons: [
            {
                id: "lesson-1",
                title: "المحاضرة الأولى (التعريف بعلم التفسير)",
                shortTitle: "التعريف بعلم التفسير",
                description: "تعريف بعلم التفسير ونشأته وأهميته.",
            },
            {
                id: "lesson-2",
                title: "المحاضرة الثانية (نشأة علم التفسير)",
                shortTitle: "نشأة علم التفسير",
                description: "مراحل نشأة علم التفسير وتطوره.",
            },
            {
                id: "lesson-3",
                title: "المحاضرة الثالثة (مصادر التفسير)",
                shortTitle: "مصادر التفسير",
                description: "أهم المصادر التي يعتمد عليها المفسر.",
            },
            {
                id: "lesson-4",
                title: "المحاضرة الرابعة (مناهج المفسرين)",
                shortTitle: "مناهج المفسرين",
                description: "التعريف بأشهر مناهج التفسير.",
            },
            {
                id: "lesson-5",
                title: "المحاضرة الخامسة (ضوابط التفسير)",
                shortTitle: "ضوابط التفسير",
                description: "القواعد والضوابط الأساسية لفهم التفسير.",
            },
        ],
    },
    {
        slug: "fiqh",
        name: "الفقه",
        intro: "يتعرف الطالب على أساسيات الفقه وأحكام العبادات والمعاملات.",
        lessons: [
            {
                id: "lesson-1",
                title: "المحاضرة الأولى (التعريف بعلم الفقه)",
                shortTitle: "التعريف بعلم الفقه",
                description: "تعريف الفقه وموضوعه ومصادره.",
            },
            {
                id: "lesson-2",
                title: "المحاضرة الثانية (مصادر الأحكام الشرعية)",
                shortTitle: "مصادر الأحكام الشرعية",
                description: "التعرف على الأدلة ومصادر الأحكام.",
            },
            {
                id: "lesson-3",
                title: "المحاضرة الثالثة (أحكام الطهارة)",
                shortTitle: "أحكام الطهارة",
                description: "مدخل إلى أحكام الطهارة في الفقه.",
            },
            {
                id: "lesson-4",
                title: "المحاضرة الرابعة (أحكام الصلاة)",
                shortTitle: "أحكام الصلاة",
                description: "أهم الأحكام المتعلقة بالصلاة.",
            },
            {
                id: "lesson-5",
                title: "المحاضرة الخامسة (أحكام الصيام)",
                shortTitle: "أحكام الصيام",
                description: "مدخل إلى أحكام الصيام.",
            },
        ],
    },
    {
        slug: "aqeedah",
        name: "العقيدة",
        intro: "يتناول المقرر أصول العقيدة الإسلامية ومبادئها.",
        lessons: [
            {
                id: "lesson-1",
                title: "المحاضرة الأولى (التعريف بالعقيدة)",
                shortTitle: "التعريف بالعقيدة",
                description: "معنى العقيدة وأهميتها ومصادرها.",
            },
            {
                id: "lesson-2",
                title: "المحاضرة الثانية (أركان الإيمان)",
                shortTitle: "أركان الإيمان",
                description: "التعريف بأركان الإيمان ومعانيها.",
            },
            {
                id: "lesson-3",
                title: "المحاضرة الثالثة (الإيمان بالله)",
                shortTitle: "الإيمان بالله",
                description: "أصول الإيمان بالله تعالى.",
            },
            {
                id: "lesson-4",
                title: "المحاضرة الرابعة (الإيمان بالرسل)",
                shortTitle: "الإيمان بالرسل",
                description: "الإيمان بالرسل ومكانتهم.",
            },
            {
                id: "lesson-5",
                title: "المحاضرة الخامسة (الإيمان باليوم الآخر)",
                shortTitle: "الإيمان باليوم الآخر",
                description: "أصول الإيمان باليوم الآخر.",
            },
        ],
    },
    {
        slug: "hadith",
        name: "الحديث",
        intro: "يتعرف الطالب على علم الحديث ومصطلحاته ومكانته.",
        lessons: [
            {
                id: "lesson-1",
                title: "المحاضرة الأولى (التعريف بعلم الحديث)",
                shortTitle: "التعريف بعلم الحديث",
                description: "تعريف علم الحديث وموضوعه وأهميته.",
            },
            {
                id: "lesson-2",
                title: "المحاضرة الثانية (السنة النبوية)",
                shortTitle: "السنة النبوية",
                description: "مكانة السنة النبوية وحجيتها.",
            },
            {
                id: "lesson-3",
                title: "المحاضرة الثالثة (أقسام الحديث)",
                shortTitle: "أقسام الحديث",
                description: "التعرف على أقسام الحديث الأساسية.",
            },
            {
                id: "lesson-4",
                title: "المحاضرة الرابعة (الحديث الصحيح)",
                shortTitle: "الحديث الصحيح",
                description: "شروط الحديث الصحيح ومراتبه.",
            },
            {
                id: "lesson-5",
                title: "المحاضرة الخامسة (الحديث الضعيف)",
                shortTitle: "الحديث الضعيف",
                description: "مدخل إلى الحديث الضعيف وأسبابه.",
            },
        ],
    },
];

export function getSubjectFromUrl() {
    const subjectSlug = new URLSearchParams(window.location.search).get("subject") ?? "tafseer";
    const subject = subjects.find(({ slug }) => slug === subjectSlug);

    if (!subject) {
        throw new Error(`Unknown subject: ${subjectSlug}`);
    }

    return subject;
}
