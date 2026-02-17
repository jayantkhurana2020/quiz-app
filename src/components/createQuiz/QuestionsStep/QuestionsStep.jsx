import React, { useState, useEffect } from "react";
import "./QuestionsStep.scss";

const QuestionsStep = ({
  quiz,
  errors,
  addQuestion,
  deleteQuestion,
  updateQuestion,
  addOption,
  deleteOption,
  updateOption,
  toggleCorrectAnswer
}) => {

  const [latestErrors, setLatestErrors] = useState({...errors});

  useEffect(() => {
    setLatestErrors({...errors});
  }, [errors]);

  return (
    <div className="questions-step">
      <div className="questions-header">
        <h2>Build Questions</h2>
        <button
          type="button"
          className="add-question-btn"
          onClick={ () => {
            addQuestion(),
            setLatestErrors({})
          }}
        >
          + Add Question
        </button>
      </div>

      {quiz.questions.length === 0 && (
        <p className="empty-state">
          No questions yet. Click "Add Question" to begin.
        </p>
      )}

      {latestErrors.questions && (<p className="error-text" >{latestErrors.questions}</p>)}

      {quiz.questions.map((question, qIndex) => (
        <div key={question.id} className="question-card">

          {/* Question Header */}
          <div className="question-top">
            <h3>Question {qIndex + 1}</h3>
            <button
              type="button"
              className="delete-question-btn"
              onClick={() => deleteQuestion(question.id)}
            >
              ✕
            </button>
          </div>

          {/* Question Text */}
          <textarea
            className="question-input"
            id= {question.id}
            placeholder="Enter your question..."
            value={question.questionText}
            onChange={(e) =>
              updateQuestion(
                question.id,
                "questionText",
                e.target.value
              )
            }

            onClick={() => setLatestErrors({})}
          />

          {/* question type selector */}
          <div className="question-type-selector">
            <label >
              <input 
                type= "radio"
                name= {`{type-${question.id}}`}
                value= "single"
                checked= {question.type === "single"}
                onChange={() => updateQuestion(question.id, "type", "single")}
              />
            Single Correct Answer
            </label>

            <label>
              <input
                type="radio"
                name={`type-${question.id}`}
                value="multiple"
                checked={question.type === "multiple"}
                onChange={() =>
                  updateQuestion(question.id, "type", "multiple")
                }
              />
              Multiple Correct Answers
            </label>
          </div>

          {/* Show question error */}
          {latestErrors[`question-${qIndex}`] && (
            <p className="error-text">
              {latestErrors[`question-${qIndex}`]}
            </p>
          )}

          {/* Options */}
          <div className="options-container">
            {question.options.map((option, oIndex) => (
              <div key={option.id} className="option-row">

                <input
                  id={oIndex}
                  type={
                    question.type === "single"
                      ? "radio"
                      : "checkbox"
                  }
                  name={`correct-${question.id}`}
                  checked={option.isCorrect}
                  onChange={() =>
                    toggleCorrectAnswer(
                      question.id,
                      option.id
                    )
                  }
                  onClick={() => setLatestErrors({})}
                />

                <input
                  type="text"
                  className="option-input"
                  placeholder={`Option ${oIndex + 1}`}
                  value={option.text}
                  onChange={(e) =>
                    updateOption(
                      question.id,
                      option.id,
                      e.target.value
                    )
                  }
                  onClick={() => setLatestErrors({})}
                />

                {latestErrors[`option-${qIndex}-${oIndex}`] && (
                  <p className="error-text">
                    {latestErrors[`option-${qIndex}-${oIndex}`]}
                  </p>
                )}

                {question.options.length > 2 && (
                  <button
                    type="button"
                    className="delete-option-btn"
                    onClick={() =>
                      deleteOption(
                        question.id,
                        option.id
                      )
                    }
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Option level errors */}
          {latestErrors[`options-${qIndex}`] && (
            <p className="error-text">
              {latestErrors[`options-${qIndex}`]}
            </p>
          )}

          {latestErrors[`correct-${qIndex}`] && (
            <p className="error-text">
              {latestErrors[`correct-${qIndex}`]}
            </p>
          )}

          {question.options.length < 5 && (
            <button
              type="button"
              className="add-option-btn"
              onClick={() => { addOption(question.id), setLatestErrors({}) }}
            >
              + Add Option
            </button>
          )}
          {question.options.length === 5 && (<p>Maximum 5 options are allowed</p>)}
        </div>
      ))}
    </div>
  );
};

export default QuestionsStep;