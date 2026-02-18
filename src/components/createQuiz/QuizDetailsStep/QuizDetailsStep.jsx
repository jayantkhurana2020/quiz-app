import React, { useState, useEffect } from "react";
import "./QuizDetailsStep.scss";

const QuizDetailsStep = ({ quiz, errors, updateQuizField }) => {

  const [latestErrors, setLatestErrors] = useState({...errors});
  
  useEffect(() => {
    setLatestErrors({...errors});
  }, [errors]);

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
          onClick={() => setLatestErrors({})}
          placeholder="Enter quiz title"
        />
        {latestErrors?.title && <span className="error">{latestErrors.title}</span>}
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={quiz?.description || ""}
          onChange={(e) => updateQuizField("description", e.target.value)}
          onClick={() => setLatestErrors({})}
          placeholder="Write a short description..."
          rows={4}
        />
        {latestErrors?.description && (
          <span className="error">{latestErrors.description}</span>
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
        <label>Time Limit (in minutes)</label>
        <input
          type="number"
          value={quiz?.duration}
          onChange={(e) => updateQuizField("duration", e.target.value)}
          onClick={() => setLatestErrors({})}
          min="1" 
        />
        {latestErrors?.duration && <span className="error">{latestErrors.duration}</span>}
      </div>
    </div>
  );
};

export default QuizDetailsStep;
