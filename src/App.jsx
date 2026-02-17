import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout/Layout.jsx";

import Home from "./pages/QuizList/Home.jsx";
import Quiz from "./pages/QuizAttempt/Quiz.jsx";
import Result from "./pages/QuizResult/Result.jsx";
import CreateQuiz from "./pages/CreateQuiz/CreateQuiz.jsx";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:quizId" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
