import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/QuestionPage.css"; // Import the CSS file

const QuestionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Correctly access the recommended_questions array from location.state
  const questions = location.state?.questions?.recommended_questions || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);

  // Handle Next Question
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("No more questions!");
    }
  };

  // Handle Start Speech
  const handleStartSpeech = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false); // Automatically stop listening after some time
    }, 5000); // Listening animation duration (5 seconds)
  };

  return (
    <div className="question-page-container">
      <div className="main-box">
        <h1 className="question-page-title">Recommended Questions</h1>
        {questions.length > 0 ? (
          <div className="question-text">{questions[currentIndex]}</div>
        ) : (
          <p className="no-questions">No questions to display.</p>
        )}

        <button
          className={`microphone-button ${isListening ? "listening" : ""}`}
          onClick={handleStartSpeech}
        >
          {isListening ? "Listening" : "Start Speech"}
        </button>

        <div className="button-row">
          <button className="quit-button" onClick={() => navigate("/dashboard")}>
            Quit Interview
          </button>
          <button className="next-button" onClick={handleNext}>
            Next Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
