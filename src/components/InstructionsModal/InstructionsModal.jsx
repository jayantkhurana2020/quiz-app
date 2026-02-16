import "./InstructionsModal.scss"

function InstructionsModal({ quiz, open, onClose, onStart }) {
  if (!open || !quiz) return null;

  return (
    <div className="instructions-overlay">
      <div className="instructions-modal">

        <div className="instructions-header">
          <h2 className="quiz-title">{quiz.title}</h2>
          <button
            className="instructions-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <p className="quiz-description">{quiz.description}</p>

        <div className="instructions-divider" />

        <div className="quiz-meta">
          <div className="meta-item">
            <span>Total Questions :</span>
            <strong>{quiz.questions.length}</strong>
          </div>

          <div className="meta-item">
            <span>Duration :</span>
            <strong>{quiz.duration} min</strong>
          </div>

          <div className="meta-item">
            <span>Marking :</span>
            <strong>No negative</strong>
          </div>

          <div className="meta-item">
            <span>Type :</span>
            <strong>MCQs</strong>
          </div>
        </div>

        <div className="instructions-actions">
          <button className="start-btn" onClick={onStart}>
            Start Quiz
          </button>

          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

export default InstructionsModal;