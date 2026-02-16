import { useState } from "react";
import { useNavigate } from "react-router-dom";
import quizzes from "../../data/quizzes.json";
import Card from "../../components/ui/Card/Card.jsx";
import InstructionsModal from "../../components/InstructionsModal/InstructionsModal";
import "./Home.scss";

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

        {/* HERO */}
        <div className="hero">
          <h1>Make Learning Awesome.</h1>
          <p className="hero-subtitle">
            Interactive quizzes designed to challenge your mind and make learning exciting.
          </p>

          <div className="quiz-searh-bar-wrapper">
            <input
              id="quiz-searh-bar"
              type="text"
              placeholder="Search quizzes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* QUIZ GRID */}
        <div className="quiz-list-wrapper">
          {filteredQuizzes.length === 0 && (
            <p className="empty-state">No quizzes found.</p>
          )}

          <ul className="quiz-list">
            {filteredQuizzes.map((quiz) => (
              <li key={quiz.id} className="quiz-item">
                <Card hover>
                  <div
                    className="quiz-card"
                    onClick={() => {
                      setSelectedQuiz(quiz);
                      setShowModal(true);
                    }}
                  >
                    <h3>{quiz.title}</h3>
                    <p>{quiz.description}</p>

                    <div className="card-footer">
                      <button className="start-btn">
                        Start Quiz →
                      </button>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>

        {/* MODAL */}
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
      </section>
    </div>
  );
}
