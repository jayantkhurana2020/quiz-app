import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useQuizGuard() {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const isQuizActive = sessionStorage.getItem("quizActive");
    
    if (!isQuizActive) {
      navigate("/", {replace: true});
    }
  }, [navigate]);
}