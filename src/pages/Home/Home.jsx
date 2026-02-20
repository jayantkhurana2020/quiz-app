import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import seedQuizzes from "../../data/quizzes.json";
import { getStoredQuizzes } from "../../utils/storage.js";
import Card from "../../components/ui/Card/Card.jsx";
import InstructionsModal from "../../components/InstructionsModal/InstructionsModal.jsx";
import Button from "../../components/ui/Button/Button.jsx";
import SkeletonGrid from "../../components/ui/skeleton/SkeletonGrid/SkeletonGrid.jsx";
import "./Home.scss";

export default function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const quizzes = [...seedQuizzes, ...getStoredQuizzes()];
  const [filteredQuizzes, setFilteredQuizzes] = useState(quizzes);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsSearching(true);

    const timeoutId = setTimeout(() => {
      let filtered = quizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(search.toLowerCase()) ||
        quiz.description.toLowerCase().includes(search.toLowerCase())
      );

      // SORTING
      switch (sortBy) {
        case "name":
          filtered.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          break;

        case "category":
          filtered.sort((a, b) =>
            (a.category || "").localeCompare(b.category || "")
          );
          break;

        case "difficulty":
          const difficultyOrder = {
            Easy: 1,
            Medium: 2,
            Hard: 3,
          };

          filtered.sort(
            (a, b) =>
              (difficultyOrder[a.difficulty] || 0) -
              (difficultyOrder[b.difficulty] || 0)
          );
          break;

        case "newest":
        default:
          filtered.sort(
            (a, b) =>
              new Date(b.createdAt || 0) -
              new Date(a.createdAt || 0)
          );
      }

      setFilteredQuizzes(filtered);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search, sortBy]);

  return (
    <div className="home-page">
      <section className="quiz-section">

        {/* HERO */}
        <div className="hero">
          <h1>Make Learning Awesome.</h1>
          <p className="hero-subtitle">
            Interactive quizzes designed to challenge your mind and make learning exciting.
          </p>
          
          <div>
            <Button
              variant="primary"
              type = "button"
              onClick={() => navigate("/create-quiz")}
            >
              Create Quiz
            </Button>
          </div>

          <div className="quiz-searh-bar-wrapper">
            <input
              id="quiz-searh-bar"
              type="text"
              placeholder="Search quizzes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="quiz-sort-wrapper">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option id="newest" value="newest">Newest</option>
              <option id="name" value="name">Name (A-Z)</option>
              <option id="category" value="category">Category</option>
              <option id="difficulty" value="difficulty">Difficulty</option>
            </select>
          </div>
        </div>

        {/* QUIZ GRID */}
        <div className="quiz-list-wrapper">
          {loading || isSearching ? (
            <SkeletonGrid count={10} />
          ) : (
            <>
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
                        <div className="meta">
                          <h2 className="title">{quiz.title}</h2>
                          <p className="description">{quiz.description}</p>
                          <p>Time Limit (in minutes): {quiz.duration}</p>
                          <p>Total Questions: {quiz.questions.length}</p>
                        </div>

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
            </>
          )}
        </div>


        {/* MODAL */}
        <InstructionsModal
          quiz={selectedQuiz}
          open={showModal}
          onClose={() => setShowModal(false)}
          onStart={() => {
            setShowModal(false);
            navigate(`/quiz/${selectedQuiz.id}`);
          }}
        />
      </section>
    </div>
  );
}
