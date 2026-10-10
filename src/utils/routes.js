export function quizPageUrl(page, subjectSlug, quizId) {
    return `/subjects/${page}.html?subject=${subjectSlug}&quiz=${quizId}`;
}
