import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import seedQuizzes from "../../data/quizzes.json";
import { getStoredQuizzes } from "../../utils/storage.js";
import useQuizGuard from "../../hooks/useQuizGuard.js";
import Container from "../../components/ui/Container/Container.jsx";
import Card from "../../components/ui/Card/Card";
import Button from "../../components/ui/Button/Button";
import "./Quiz.scss";

export default function Quiz() {
  useQuizGuard();

  const { quizId } = useParams();
  const navigate = useNavigate();

  const quizzes = [...seedQuizzes, ...getStoredQuizzes()];
  const quiz = quizzes.find((q) => q.id === quizId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz ? quiz.duration * 60 : 0);
  const [isAnimating, setIsAnimating] = useState(false);

  const endTimeRef = useRef(null);

  if (!quiz) {
    return <p className="quiz-error">Quiz not found</p>;
  }

  const currentQuestion = quiz.questions[currentIndex];

  const questionsProgressPercentage =
    ((currentIndex + 1) / quiz.questions.length) * 100;

  const totalSeconds = quiz.duration * 60;
  const timerProgressPercent = (timeLeft / totalSeconds) * 100;

  const unansweredCount =
    quiz.questions.length - Object.keys(answers).length;

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

  // ✅ Updated to use option.id
  function handleOptionSelect(optionId) {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  }

  // ✅ Updated scoring logic
  function calculateScore() {
    let score = 0;

    quiz.questions.forEach((question) => {
      const selectedOptionId = answers[question.id];

      const correctOption = question.options.find(
        (option) => option.isCorrect
      );

      if (selectedOptionId === correctOption?.id) {
        score += quiz.pointsPerQuestion || 1;
      }
    });

    return score;
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

    navigate("/result", {
      state: {
        score,
        total: quiz.questions.length,
        quizId: quiz.id,
      },
    });
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function changeQuestion(newIndex) {
    if (newIndex < 0 || newIndex >= quiz.questions.length) return;

    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 200);
  }

  return (
    <Container>
      <div className="quiz-wrapper">

        {/* Progress Bar */}
        <div className="quiz-progress-bar-wrapper">
          <div
            className="quiz-progress-bar"
            style={{ width: `${questionsProgressPercentage}%` }}
          />
        </div>

        <div className="quiz-top">
          <h1 className="quiz-title">{quiz.title}</h1>

          <div className="quiz-meta">
            <span>{unansweredCount} Unanswered</span>
            <span>
              Question {currentIndex + 1} of {quiz.questions.length}
            </span>

            <div
              className="quiz-timer-circle"
              style={{
                background: `conic-gradient(
                  var(${timeLeft <= 10 ? "--danger" : "--primary"}) ${timerProgressPercent}%,
                  var(--border) ${timerProgressPercent}%
                )`,
              }}
            >
              <div
                className="quiz-timer-inner"
                style={{
                  color: `var(${timeLeft <= 10 ? "--danger" : "--text-primary"})`,
                }}
              >
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>

        <Card padding="lg">
          <div
            className={`question-container ${
              isAnimating ? "fade-out" : "fade-in"
            }`}
          >
            {/* ✅ Updated question field */}
            <h2 className="question-text">
              {currentQuestion.questionText}
            </h2>

            <div className="options-grid">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  className={`option-block ${
                    answers[currentQuestion.id] === option.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    handleOptionSelect(option.id)
                  }
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <div className="quiz-navigation">
          <Button
            variant="outline"
            onClick={() =>
              changeQuestion(currentIndex - 1)
            }
            disabled={currentIndex === 0}
          >
            Prev
          </Button>

          <Button
            onClick={() =>
              changeQuestion(currentIndex + 1)
            }
            disabled={
              currentIndex === quiz.questions.length - 1
            }
          >
            Next
          </Button>
        </div>

        <div className="quiz-submit">
          <Button
            variant="safe"
            onClick={() =>
              setShowSubmitModal(true)
            }
            disabled={submitted}
            fullWidth
          >
            Submit Quiz
          </Button>
        </div>

        {showSubmitModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Submit Quiz?</h2>
              <p>
                You won’t be able to change your
                answers after submitting.
              </p>

              <div className="modal-actions">
                <Button
                  variant="outline"
                  onClick={() =>
                    setShowSubmitModal(false)
                  }
                >
                  Cancel
                </Button>

                <Button
                  variant="danger"
                  onClick={handleConfirmSubmit}
                >
                  Yes, Submit
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
