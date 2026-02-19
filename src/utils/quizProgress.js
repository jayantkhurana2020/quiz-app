const getKey = (quizId) => `quiz-progress-${quizId}`;

export const saveProgress = ({
  quizId,
  endTime,
  answers,
  currentIndex,
}) => {
  const data = {
    quizId,
    endTime,
    answers,
    currentIndex,
  };

  localStorage.setItem(getKey(quizId), JSON.stringify(data));
};

export const loadProgress = (quizId) => {
  const raw = localStorage.getItem(getKey(quizId));
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const clearProgress = (quizId) => {
  localStorage.removeItem(getKey(quizId));
};
