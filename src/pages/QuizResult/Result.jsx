import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card/Card";
import "./Result.css"

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const {score, total, quizId} = location.state || {};

  if(!location.state) {
    return <p>No result data found.</p>;
  }

  function handleReattempt() {
    sessionStorage.setItem("quizActive", "true");
    navigate(`/quiz/${quizId}`);
  }

  function handleHome() {
    navigate("/");
  }

  return (
    <div className="result-container">
      <Card>

        <h1>Quiz Completed 🎉</h1>

        <div className="result-score">
          <h2>
            You scored {score} / {total}
          </h2>
        </div>

        <div className="result-actions">
          <button onClick={handleReattempt} className="result-btn primary">
            Reattempt Quiz
          </button>

          <button onClick={handleHome} className="result-btn">
            Back to Home
          </button>
        </div>
      </Card>
    </div>
  );
}

export default Result;
