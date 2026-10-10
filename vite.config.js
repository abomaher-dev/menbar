import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
    plugins: [tailwindcss()],
    build: {
        rollupOptions: {
            input: {
                home: resolve(projectRoot, "index.html"),
                library: resolve(projectRoot, "pages/library.html"),
                schedule: resolve(projectRoot, "pages/schedule.html"),
                academicSupport: resolve(
                    projectRoot,
                    "pages/academic-support.html",
                ),
                myAccount: resolve(projectRoot, "pages/my-account.html"),
                editAccount: resolve(projectRoot, "pages/edit-account.html"),
                changePassword: resolve(
                    projectRoot,
                    "pages/change-password.html",
                ),
                myCertificates: resolve(
                    projectRoot,
                    "pages/my-certificates.html",
                ),
                myGrades: resolve(projectRoot, "pages/my-grades.html"),
                subjectContent: resolve(projectRoot, "subjects/content.html"),
                subjectLearn: resolve(projectRoot, "subjects/learn.html"),
                subjectGrades: resolve(projectRoot, "subjects/grades.html"),
                subjectTeachers: resolve(projectRoot, "subjects/teachers.html"),
                subjectAbout: resolve(projectRoot, "subjects/about.html"),
                quizStart: resolve(projectRoot, "subjects/quiz-start.html"),
                quizMcq: resolve(projectRoot, "subjects/quiz-mcq.html"),
                quizTrueFalse: resolve(
                    projectRoot,
                    "subjects/quiz-true-false.html",
                ),
            },
        },
    },
});
