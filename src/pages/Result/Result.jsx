import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card/Card";
import "./Result.scss";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, total, quizId } = location.state || {};

  if (!location.state) {
    return <p>No result data found.</p>;
  }

  const percentage = Math.round((score / total) * 100);
  const passThreshold = 33;
  const isPassed = percentage >= passThreshold;

  function handleReattempt() {
    navigate(`/quiz/${quizId}`);
  }

  function handleHome() {
    navigate("/");
  }

  return (
    <div className="result-container">
      <Card padding="lg">
        <h1 className="result-title">
          {isPassed ? "🎉 Congratulations!" : "📘 Keep Practicing!"}
        </h1>

        <div className="result-score">
          <h2>
            You scored : {score} / {total}
          </h2>
          <div className="result-percentage">
            {percentage}%
          </div>

          <div className={`result-status ${isPassed ? "pass" : "fail"}`}>
            {isPassed ? "PASSED" : "FAILED"}
          </div>
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
