
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/QuestionPage.css"; // Import the CSS file

const QuestionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Correctly access the recommended_questions array from location.state
  const questions = location.state?.questions?.recommended_questions || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [femaleVoice, setFemaleVoice] = useState(null); // Store the selected female voice

  // Function to fetch voices and select a female voice
  const setPreferredVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find((voice) =>
      voice.name.toLowerCase().includes("female")
    ) || voices.find((voice) => voice.lang === "en-US"); // Fallback to a default English voice
    setFemaleVoice(preferredVoice);
  };

  // Fetch voices once they are loaded
  useEffect(() => {
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = setPreferredVoice;
    } else {
      setPreferredVoice(); // For browsers where voices are already loaded
    }
  }, []);

  // Function to convert text to speech
  const speakQuestion = (text) => {
    if (text.trim() !== "" && femaleVoice) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = femaleVoice; // Set the selected female voice
      window.speechSynthesis.speak(utterance);
    }
  };

  // Prevent double speech for the first question
  useEffect(() => {
    if (questions.length > 0 && currentIndex === 0) {
      speakQuestion(questions[currentIndex]);
    }
  }, [questions, femaleVoice]); // Wait for voice to load before speaking

  // UseEffect to speak the question whenever the currentIndex changes
  useEffect(() => {
    if (currentIndex > 0) {
      speakQuestion(questions[currentIndex]);
    }
  }, [currentIndex, questions]);

  // Handle Next Question
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("No more questions!");
    }
  };

  // Handle Start Speech (Listening Animation Only)
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
