import { useState, useEffect, useRef } from "react";
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

	const [isRecording, setIsRecording] = useState(false);
	const [audioBlob, setAudioBlob] = useState(null);
	const mediaRecorderRef = useRef(null);
	const audioChunks = useRef([]);

	// Function to fetch voices and select a female voice
	const setPreferredVoice = () => {
		const voices = window.speechSynthesis.getVoices();
		const preferredVoice = voices.find((voice) => voice.name.toLowerCase().includes("female")) || voices.find((voice) => voice.lang === "en-US"); // Fallback to a default English voice
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

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorderRef.current = new MediaRecorder(stream);

			mediaRecorderRef.current.ondataavailable = (event) => {
				audioChunks.current.push(event.data);
			};

			mediaRecorderRef.current.onstop = () => {
				const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
				setAudioBlob(audioBlob);
				audioChunks.current = []; // Clear the chunks for next recording
				sendAudioToServer(audioBlob);
			};

			mediaRecorderRef.current.start();
			setIsRecording(true);
		} catch (err) {
			console.error("Error accessing the microphone", err);
		}
	};

	const stopRecording = () => {
		mediaRecorderRef.current.stop();
		setIsRecording(false);
	};

	const sendAudioToServer = (audioBlob) => {
		const formData = new FormData();
		formData.append("file", audioBlob, "audio.wav");

		fetch("http://127.0.0.1:5001/upload", {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Audio sent successfully:", data);
			})
			.catch((error) => {
				console.error("Error sending audio:", error);
			});
	};

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
				{questions.length > 0 ? <div className="question-text">{questions[currentIndex]}</div> : <p className="no-questions">No questions to display.</p>}

				{/* <button
          className={`microphone-button ${isListening ? "listening" : ""}`}
          onClick={handleStartSpeech}
        >
          {isListening ? "Listening" : "Start Speech"}
        </button> */}

				<button className={`microphone-button ${isListening ? "listening" : ""}`} onClick={isRecording ? stopRecording : startRecording}>
					{isRecording ? "Stop Recording" : "Start Recording"}
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
