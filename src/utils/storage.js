const STORAGE_KEY = "react-quiz-app-quizzes";

export const getStoredQuizzes = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveQuiz = (quiz) => {
    const existing = getStoredQuizzes(quiz);
    const updated = [...existing, quiz]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export const clearQuizzes = () => {
  localStorage.removeItem(STORAGE_KEY);
};