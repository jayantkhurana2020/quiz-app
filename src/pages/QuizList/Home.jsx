import { useState } from "react";
import { useNavigate } from "react-router-dom";
import quizzes from "../../data/quizzes.json";
import Card from "../../components/ui/Card/Card.jsx";
import "./Home.css";
import Quiz from "../QuizAttempt/Quiz"
import InstructionsModal from "../../components/InstructionsModal/InstructionsModal";

export default function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(search.toLowerCase()) ||
    quiz.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-page">
      <section className="quiz-section">
        <h1>Available Quizzes</h1>
        
        <div className="quiz-searh-bar-wrapper">
          <input
            id="quiz-searh-bar"
            type="text"
            placeholder="Search quiz..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="quiz-list-wrapper">
          {filteredQuizzes.length === 0 && <p>No quizzes found.</p>}
          <ol className="quiz-list">
            {filteredQuizzes.map((quiz, index) => (
              <Card hover key={index}>
                <li 
                  key={quiz.id}
                  onClick={() => {
                    setSelectedQuiz(quiz);
                    setShowModal(true);
                  }}
                >
                  <strong>{quiz.title}</strong> — {quiz.description}
                </li>

              </Card>
            ))}
          </ol>
        </div>

        <InstructionsModal
          quiz={selectedQuiz}
          open={showModal}
          onClose={() => setShowModal(false)}
          onStart={() => {
            sessionStorage.setItem("quizActive", "true");
            setShowModal(false);
            navigate(`/quiz/${selectedQuiz.id}`);
          }}
        />

        {selectedQuiz && (
          <p>
            Selected quiz: <strong>{selectedQuiz.title}</strong>
          </p>
        )}

      </section>
    </div>
  );
}
