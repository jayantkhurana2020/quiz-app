import "./InstructionsModal.css"

function InstructionsModal ({quiz, open, onClose, onStart}) {

    if (!open || !quiz) return null;

    return (
        <div className="instructions-overlay">
            <div className="instructions-modal">

                <button className="instructions-close" onClick={onClose}>
                    X
                </button>

                <h2 className="quiz-title">{quiz.title}</h2>
                <p>{quiz.description}</p>

                <hr />

                <ul>
                    <li>Total questions : {quiz.questions.length}</li>
                    <li>Duration: {quiz.duration} minutes</li>
                    <li>No negative marking.</li>
                    <li>All questions are MCQs type.</li>
                </ul>

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