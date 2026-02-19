import React from "react";
import "./ReviewStep.scss";

const ReviewStep = ({ quiz, onEditQuestion }) => {
  return (
    <div className="review-step">
      <h2 className="review-title">Review Your Quiz</h2>

      {/* Quiz Summary */}
      <div className="quiz-summary-card">
        <div className="summary-item">
          <span className="label">Title</span>
          <span className="value">{quiz.title || "-"}</span>
        </div>

        <div className="summary-item">
          <span className="label">Category</span>
          <span className="value">{quiz.category || "-"}</span>
        </div>

        <div className="summary-item">
          <span className="label">Difficulty</span>
          <span className="value">{quiz.difficulty || "-"}</span>
        </div>

        <div className="summary-item">
          <span className="label">Time Limit (in minutes)</span>
          <span className="value">
            {quiz.duration ? `${quiz.duration}` : "-"}
          </span>
        </div>

        <div className="summary-item">
          <span className="label">Total Questions</span>
          <span className="value">{quiz.questions.length}</span>
        </div>
      </div>

      {/* Questions Review */}
      <div className="questions-review">
        {quiz.questions.map((question, qIndex) => (
          <div key={question.id} className="review-question-card">

            {/* Question Header */}
            <div className="question-header">
              <h3 className="question-title">
                Q{qIndex + 1}. {question.questionText}
              </h3>

              <button
                type="button"
                className="edit-btn"
                onClick={() => onEditQuestion(qIndex)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
              </button>
            </div>

            <div className="review-options">
              {question.options.map((option) => (
                <div
                  key={option.id}
                  className={`review-option ${
                    option.isCorrect ? "correct" : ""
                  }`}
                >
                  {option.text}
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewStep;
