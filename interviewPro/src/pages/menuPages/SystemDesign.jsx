import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./CSS/menuPage.css";

const SystemDesign = () => {
  const [selectedExpertise, setSelectedExpertise] = useState(["system design"]); // Contains "frontend" by default
  const [level, setLevel] = useState("Beginner");
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const topics = {
    Beginner: ["HTML", "CSS", "JavaScript", "responsive","box model","meta","versions","tags","margin","ordered list","link","embed","pseudo-class","display"],
    Intermediate: ["class","variables", "grid", "DOM", "validation","reusability","optimization","events","asynchronous","API","viewport","testing","transitions"],
    Expert: ["React", "SSR", "context API", "state management", "JSX","custom hooks","error handeling","methodology","routing","optimization","Automatic Design"],
  };

  const navigate = useNavigate(); // Initialize navigate

  const handleButtonClick = (topic) => {
    if (selectedExpertise.includes(topic)) {
      setSelectedExpertise(selectedExpertise.filter((t) => t !== topic));
    } else {
      setSelectedExpertise([...selectedExpertise, topic]);
    }
  };

  const handleSubmit = async () => {
    if (selectedExpertise.length === 0 || (selectedExpertise.length === 1 && selectedExpertise[0] === "frontend")) {
      alert("You must select a topic");
      return;
    }

    const payload = {
      expertise: selectedExpertise,
      level,
    };

    try {
      const response = await axios.post("http://localhost:5001/recommend-questions", payload);
      if (response.status === 200) {
        alert("Recommended questions loaded!");
        console.log("Recommended Questions:", response.data);
        // Navigate to QuestionPage and pass the questions
        navigate("/dashboard/questions", { state: { questions: response.data } });
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error.message);
      alert("Failed to fetch recommendations. Please try again.");
    }
  };

  useEffect(() => {
    const isButtonDisabled = selectedExpertise.length === 1 && selectedExpertise[0] === "frontend";
    setButtonDisabled(isButtonDisabled);
  }, [selectedExpertise]);

  const totalTopics = topics[level].length;
  const selectedCount = selectedExpertise.filter((t) => t !== "frontend").length;
  const progressPercentage = Math.round((selectedCount / totalTopics) * 100);

  return (
    <div className="frontend-container">
      <h1 className="header-text">System Design</h1>
      <p className="subheader-text">Select the topic you are best at</p>

      <div className="dropdown-container">
        <label htmlFor="level-dropdown">Select your level:</label>
        <select
          id="level-dropdown"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>
      </div>

      <div className="topics-container">
        {topics[level].map((topic, index) => (
          <button
            key={index}
            className={`topic-button ${selectedExpertise.includes(topic) ? "selected" : ""}`}
            onClick={() => handleButtonClick(topic)}
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="next-button-container">
        <button
          className={`next-btn ${isButtonDisabled ? "disabled" : ""}`}
          onClick={handleSubmit}
          disabled={isButtonDisabled}
        >
          Next
        </button>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
      </div>
    </div>
  );
};

export default SystemDesign;
