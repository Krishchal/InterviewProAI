import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QuestionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Correctly access the recommended_questions array from location.state
  const questions = location.state?.questions?.recommended_questions || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle Next Question
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("No more questions!");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Recommended Questions</h1>
      {questions.length > 0 ? (
        <>
          <div style={{ margin: "20px auto", fontSize: "20px" }}>
            {questions[currentIndex]}
          </div>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            onClick={handleNext}
          >
            Next Question
          </button>
        </>
      ) : (
        <p>No questions to display.</p>
      )}
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
        onClick={() => navigate("/")}
      >
        Go Back
      </button>
    </div>
  );
};

export default QuestionPage;
