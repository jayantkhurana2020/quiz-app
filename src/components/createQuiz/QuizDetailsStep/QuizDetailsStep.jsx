import React from "react";
import "./QuizDetailsStep.scss";

const QuizDetailsStep = ({ quiz, errors, updateQuizField }) => {
  return (
    <div className="quiz-details-step">
      <h2 className="step-title">Quiz Details</h2>
      <p className="step-subtitle">
        Provide basic information about your quiz
      </p>

      <div className="form-group">
        <label>Quiz Title</label>
        <input
          type="text"
          value={quiz?.title || ""}
          onChange={(e) => updateQuizField("title", e.target.value)}
          placeholder="Enter quiz title"
        />
        {errors?.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={quiz?.description || ""}
          onChange={(e) => updateQuizField("description", e.target.value)}
          placeholder="Write a short description..."
          rows={4}
        />
        {errors?.description && (
          <span className="error">{errors.description}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={quiz?.category || ""}
            onChange={(e) => updateQuizField("category", e.target.value)}
            placeholder="e.g. Programming, Math"
          />
        </div>

        <div className="form-group">
          <label>Difficulty</label>
          <select
            value={quiz?.difficulty || ""}
            onChange={(e) => updateQuizField("difficulty", e.target.value)}
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Time Limit (minutes)</label>
        <input
          type="number"
          value={quiz?.duration || 0}
          onChange={(e) => updateQuizField("duration", e.target.value)}
          min="1"
        />
        {errors?.duration && <span className="error">{errors.duration}</span>}
      </div>
    </div>
  );
};

export default QuizDetailsStep;
