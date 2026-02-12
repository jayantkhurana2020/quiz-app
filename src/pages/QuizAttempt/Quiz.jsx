import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import quizzes from "../../data/quizzes.json";
import useQuizGuard from "../../hooks/useQuizGuard.js";
import "./Quiz.css";

export default function Quiz() {
  useQuizGuard();

  const { quizId } = useParams();
  const navigate = useNavigate();

  const quiz = quizzes.find((q) => q.id === quizId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [timeLeft, setTimeLeft] = useState(quiz ? quiz.duration * 60 : 0);
  const endTimeRef = useRef(null);


  if (!quiz) {
    return <p className="quiz-error">Quiz not found</p>;
  }

  const currentQuestion = quiz.questions[currentIndex];

//   timer effect

  useEffect(() => {

    if (!quiz || submitted) return;

    if (!endTimeRef.current) {
        endTimeRef.current = Date.now() + quiz.duration * 60 * 1000;
    }

    const interval = setInterval(() => {
        const remaining = Math.max(
            0,
            Math.floor((endTimeRef.current - Date.now()) / 1000)
        );

        setTimeLeft(remaining);

        if (remaining === 120) {
            toast.warning("Only 2 minutes left!");
        }

        if (remaining === 0) {
            clearInterval(interval);
            handleAutoSubmit();
        }

    }, 1000);

    return () => clearInterval(interval);
  }, [quiz, submitted]);


  function handleOptionSelect (optionIndex) {
    setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: optionIndex
    }));
  }

  function calculateScore() {
    let score = 0;

    quiz.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        score += 1;
      }
    });

    return score;
  }

  function handleSubmitClick() {
    setShowSubmitModal(true);
  }

  function handleAutoSubmit() {
    const score = calculateScore();
    setSubmitted(true);
    sessionStorage.removeItem("quizActive");

    navigate("/result", {
      state: {
        score,
        total: quiz.questions.length,
        quizId: quiz.id,
      },
    });
  }

  function handleConfirmSubmit() {
    const score = calculateScore();
    setSubmitted(true);
    setShowSubmitModal(false);
    sessionStorage.removeItem("quizActive");

    navigate("/result", {state: {
        score,
        total: quiz.questions.length,
        quizId: quiz.id
    }});
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }


  return (
    <div className="quiz-container">

        <header className="quiz-header">
            <h1 className="quiz-title">{quiz.title}</h1>

            <div className="quiz-top-bar">
                <p className="quiz-progress"> Question {currentIndex + 1} of {quiz.questions.length}</p>

                <div className={`quiz-timer ${timeLeft <= 120 ? "warning" : ""}`}>
                    ⏳ {formatTime(timeLeft)}
                </div>
            </div>
        </header>

        <section className="quiz-question">
            <h3 className="question-text">{currentQuestion.question}</h3>
        </section>

        <ul className="quiz-options">
            {currentQuestion.options.map((option, index) => (
                <li key={index} className="quiz-option">

                    <label className="option-label">

                        <input 
                            type="radio"
                            className="option-input"
                            name={`question-${currentQuestion.id}`}
                            checked={answers[currentQuestion.id] === index}
                            onChange={() => handleOptionSelect(index)}
                        />

                        <span className="option-text">{option}</span>

                    </label>
                </li>
            ))}
        </ul>
        
        <div className="quiz-navigation">

            <button className="nav-button"
                onClick={() => setCurrentIndex((i) => i - 1)}
                disabled={currentIndex === 0}
            >
                Prev 
            </button>

            <button
                className="nav-button primary"
                onClick={() => setCurrentIndex((i) => i + 1)}
                disabled={currentIndex === quiz.questions.length - 1}
            >
                Next
            </button>
        </div>

        <div className="quiz-submit">
            <button
            className="submit-button"
            onClick={handleSubmitClick}
            disabled={submitted}
            >
            Submit Quiz
            </button>
      </div>

       {showSubmitModal && (
            <div className="modal-overlay">
                <div className="modal">
                    <h2>Submit Quiz?</h2>
                    <p>
                        You won’t be able to change your answers after submitting.
                        Are you sure you want to continue?
                    </p>

                    <div className="modal-actions">
                    <button
                        className="modal-btn cancel"
                        onClick={() => setShowSubmitModal(false)}
                    >
                        Cancel
                    </button>

                    <button
                        className="modal-btn confirm"
                        onClick={handleConfirmSubmit}
                    >
                        Yes, Submit
                    </button>
                    </div>
                </div>
            </div>
        )}

    </div>
  );
}


