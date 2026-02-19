import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateQuiz } from "../../hooks/useCreateQuiz.js";
import "./createQuiz.scss"
import { toast } from "react-toastify";
import QuizDetailsStep from "../../components/createQuiz/QuizDetailsStep/QuizDetailsStep.jsx";
import QuestionsStep from "../../components/createQuiz/QuestionsStep/QuestionsStep.jsx";
import ReviewStep from "../../components/createQuiz/ReviewStep/ReviewStep.jsx";
import Button from "../../components/ui/Button/Button.jsx";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [editQuestionIndex, setEditQuestionIndex] = useState(null);

  const {
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
  } = useCreateQuiz();

  const nextStep = () => {
    if (!validateStep(step)) {
      toast.error("Please fix the errors before continuing");
      return;
    };
    if (step < 3) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleEditQuestion = (index) => {
    setEditQuestionIndex(index);
    setStep(2);
  };

  const handleSubmit = () => {
    const success = submitQuiz();

    if (success) {
      toast.success("Quiz created successfully!");
      navigate("/");
    }
  };

  return (
    <section className="create-quiz-page">
      <div className="create-quiz-container">
        
        <div className="create-quiz-header">
          {/* Step Indicator */}
          <div className="step-indicator">
            <span className={step === 1 ? "active" : ""}>1. Details</span>
            <span className={step === 2 ? "active" : ""}>2. Questions</span>
            <span className={step === 3 ? "active" : ""}>3. Review</span>
          </div>

          <Button
            variant="primary"
            onClick={() => navigate("/")}
          >
            Back to home
          </Button>
        </div>


        {/* Step Content */}
        <div className="step-content">
          {step === 1 && (
            <QuizDetailsStep
              quiz={quiz}
              errors={errors}
              updateQuizField={updateQuizField}
            />
          )}

          {step === 2 && (
            <QuestionsStep
              quiz={quiz}
              errors={errors}
              addQuestion={addQuestion}
              deleteQuestion={deleteQuestion}
              updateQuestion={updateQuestion}
              addOption={addOption}
              deleteOption={deleteOption}
              updateOption={updateOption}
              toggleCorrectAnswer={toggleCorrectAnswer}
              editQuestionIndex = {editQuestionIndex}
            />
          )}

          {step === 3 && (
            <ReviewStep quiz={quiz} onEditQuestion={handleEditQuestion} />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="step-navigation">
          {step > 1 && (
            <button className="back-btn" onClick={prevStep}>
              Back
            </button>
          )}

          {step < 3 && (
            <button className="next-btn" onClick={nextStep}>
              Next
            </button>
          )}

          {step === 3 && (
            <button className="submit-btn" onClick={handleSubmit}>
              Create Quiz
            </button>
          )}
        </div>

      </div>
    </section>
  );
};

export default CreateQuiz;
