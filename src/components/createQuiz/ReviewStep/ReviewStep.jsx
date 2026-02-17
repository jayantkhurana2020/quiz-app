import React from "react";
import "./ReviewStep.scss";

const ReviewStep = ({ quiz }) => {
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
          <span className="label">Time Limit</span>
          <span className="value">
            {quiz.duration ? `${quiz.duration} mins` : "-"}
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
            
            <h3 className="question-title">
              Q{qIndex + 1}. {question.questionText}
            </h3>

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
