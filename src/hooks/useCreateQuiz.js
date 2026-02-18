import { useState } from "react";
import { saveQuiz } from "../utils/storage.js";

const initialQuizState = {
  id: "",
  title: "",
  description: "",
  duration: 0,
  pointsPerQuestion: 1,
  createdAt: "",
  questions: []
};

export const useCreateQuiz = () => {
  const [quiz, setQuiz] = useState(initialQuizState);
  const [errors, setErrors] = useState({});

  /* ==============================
     QUIZ FIELD UPDATE
  ============================== */
  const updateQuizField = (field, value) => {
    setQuiz((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  /* ==============================
     QUESTION OPERATIONS
  ============================== */
  const addQuestion = () => {
    const newQuestion = {
      id: crypto.randomUUID(),
      questionText: "",
      type: "single",
      options: []
    };

    setQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const deleteQuestion = (questionId) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId)
    }));
  };

  const updateQuestion = (questionId, field, value) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId ? { ...q, [field]: value } : q
      )
    }));
  };

  /* ==============================
     OPTION OPERATIONS
  ============================== */
  const addOption = (questionId) => {
    const newOption = {
      id: crypto.randomUUID(),
      text: "",
      isCorrect: false
    };

    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId && q.options.length < 5
          ? { ...q, options: [...q.options, newOption] }
          : q
      )
    }));
  };

  const deleteOption = (questionId, optionId) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.filter((o) => o.id !== optionId)
            }
          : q
      )
    }));
  };

  const updateOption = (questionId, optionId, value) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) =>
                o.id === optionId ? { ...o, text: value } : o
              )
            }
          : q
      )
    }));
  };

  const toggleCorrectAnswer = (questionId, optionId) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => {
        if (q.id !== questionId) return q;

        // Single choice
        if (q.type === "single") {
          return {
            ...q,
            options: q.options.map((o) => ({
              ...o,
              isCorrect: o.id === optionId
            }))
          };
        }

        // Multiple choice
        return {
          ...q,
          options: q.options.map((o) =>
            o.id === optionId
              ? { ...o, isCorrect: !o.isCorrect }
              : o
          )
        };
      })
    }));
  };

  /* ==============================
     STEP VALIDATION
  ============================== */
  const validateStep = (step) => {
    const newErrors = {};

    // STEP 1 → Quiz Info
    if (step === 1) {
      if (!quiz.title.trim()) {
        newErrors.title = "Title is required";
      }

      if (quiz.duration <= 0) {
        newErrors.duration = "Duration must be greater than 0";
      }

      if(!quiz.description .trim()) {
        newErrors.description = "Description is required";
      }
    }

    // STEP 2 → Questions
    if (step === 2) {
      if (quiz.questions.length === 0) {
        newErrors.questions = "At least one question is required";
      }

      quiz.questions.forEach((q, index) => {
        if (!q.questionText.trim()) {
          newErrors[`question-${index}`] =
            "Question text is required";
        }

        if (q.options.length < 2) {
          newErrors[`options-${index}`] =
            "Minimum 2 options required";
        }

        const hasCorrect = q.options.some(
          (o) => o.isCorrect
        );

        if (!hasCorrect) {
          newErrors[`correct-${index}`] =
            "Select at least one correct answer";
        }

        q.options.forEach((o, optIndex) => {
          if (!o.text.trim()) {
            newErrors[`option-${index}-${optIndex}`] =
              "Option cannot be empty";
          }
        });
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ==============================
     FULL VALIDATION (ON SUBMIT)
  ============================== */
  const validateQuiz = () => {
    return validateStep(1) && validateStep(2);
  };

  /* ==============================
     SUBMIT
  ============================== */
  const submitQuiz = () => {
    if (!validateQuiz()) return false;

    const finalQuiz = {
      ...quiz,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    saveQuiz(finalQuiz);

    setQuiz(initialQuizState);
    setErrors({});

    return true;
  };

  return {
    quiz,
    errors,
    updateQuizField,
    addQuestion,
    deleteQuestion,
    updateQuestion,
    addOption,
    deleteOption,
    updateOption,
    toggleCorrectAnswer,
    validateStep,
    submitQuiz
  };
};
