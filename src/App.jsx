import { useState } from "react";
import allQuestions from "./data/questions";
import "./App.css";
import correctSound from "./assets/yay.mp3";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DecisionPreferenceForm from "./DecisionPreferenceForm";


function App() {
  function getGameQuestions() {
    return [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
  }

  const [screen, setScreen] = useState("home"); // home | game | result | settings
  const [numQuestions, setNumQuestions] = useState(5);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameQuestions, setGameQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const correctAudio = new Audio(correctSound);


  const currentQuestion = gameQuestions[currentIndex];

  function startGame() {
    const questions = [...allQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, numQuestions);
    setGameQuestions(questions);
    setCurrentIndex(0);
    setScore(0);
    setScreen("game");
  }

  function handleConfigSubmit(settings) {
    setNumQuestions(settings.numQuestions);
    setSoundEnabled(settings.soundEnabled);
    // Start game immediately with these settings
    const questions = [...allQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, settings.numQuestions);
    setGameQuestions(questions);
    setCurrentIndex(0);
    setScore(0);
    setScreen("game");
  }

  function handleAnswer(userAnswer) {
    const isCorrect = userAnswer === currentQuestion.answer;

    if (isCorrect) {
      setScore(score + 1);

      if (soundEnabled) {
        correctAudio.currentTime = 0;
        correctAudio.play();
      }
    }


    setTimeout(() => {
      if (currentIndex + 1 < gameQuestions.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setScreen("result");
      }
    }, 600);
  }

  if (screen === "home") {
    return (
      <div className="app-containerh">
        <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>

          <img
            src="/boy1.webp"
            alt="left decoration"
            className="side-image"
          />

          <div className="card">

            <h1 className="title">Yes or No Decision Maker</h1>
            <p className="purpose">
              Tap Start Game to begin practicing simple decisions with fun pictures and questions
            </p>
            <div className="button-stack">
              <button className="restart-btn" onClick={startGame}>
                Start Game ▶
              </button>
              <button className="home-btn" onClick={() => setScreen("settings")}>
                Game Settings 
              </button>
            </div>

          </div>

          <img
            src="/boy2.webp"
            alt="right decoration"
            className="side-image"
          />
        </div>

        <div className="info-section">
          <div className="info-box">
            <h2 className="info-title">Why Decision-Making Can Be Hard</h2>

            <p className="info-text">
              Decision-making skills can be very challenging for children with autism.
              When given choices, many children tend to:
            </p>

            <ul className="info-list">
              <li>Pick the first option immediately</li>
              <li>Always choose the last option they see</li>
            </ul>

            <p className="info-text">
              This often happens not because of preference, but due to difficulty
              processing multiple choices at once.
            </p>
          </div>

          <div className="info-box">
            <h2 className="info-title">The Power of Visual Choices</h2>

            <p className="info-text">
              Research and real-world experience show that visual supports make
              decision-making easier for autistic children.
            </p>

            <p className="info-text">
              Instead of relying only on words, showing choices visually helps children:
            </p>

            <ul className="info-list">
              <li>Understand options more clearly</li>
              <li>Reduce confusion and anxiety</li>
              <li>Make more thoughtful, independent decisions</li>
            </ul>
          </div>
        </div>
        <div className="resources-section">
          <div className="info-box resources-card">
            <h2 className="info-title">Useful Resources</h2>
            <p className="info-text">Explore these helpful websites for more support and information about autism.</p>
            <div className="resource-links">
              <a href="https://marybarbera.com/decision-making-choices-autism/" target="_blank" rel="noopener noreferrer" className="resource-link">
                <span>Decision Making & Choices</span>
              </a>
              <a href="https://www.autismparentingmagazine.com/" target="_blank" rel="noopener noreferrer" className="resource-link">
                <span>Autism Parenting Magazine</span>
              </a>
              <a href="https://www.ahany.org/" target="_blank" rel="noopener noreferrer" className="resource-link">
                <span>Asperger/Autism Network (AANE)</span>
              </a>
              <a href="https://www.autismspeaks.org/" target="_blank" rel="noopener noreferrer" className="resource-link">
                <span>Autism Speaks</span>
              </a>
              <a href="https://autismhwy.com/" target="_blank" rel="noopener noreferrer" className="resource-link">
                <span>Autism Highway</span>
              </a>
            </div>
          </div>
        </div>
        <footer className="app-footer">
          <p>&copy; 2026 Sanjana Madhavan. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  if (screen === "settings") {
    return (
      <div className="app-container">
        <DecisionPreferenceForm
          onStart={handleConfigSubmit}
          totalAvailableQuestions={allQuestions.length}
        />
        <button className="home-btn" onClick={() => setScreen("home")}>
          Back to Home 🏠
        </button>
      </div>
    );
  }


  if (screen === "result") {
    return (
      <div className="app-container1">
        <div className="card1">
          <h1 className="title1">Game Over 🎉</h1>
          <h2 className="score1">
            Your Score: {score} / {gameQuestions.length}
          </h2>

          <button className="restart-btn1" onClick={startGame}>
            Restart Game 🔁
          </button>
          <br></br>

          <button className="home-btn" onClick={() => setScreen("home")}>
            Home 🏠
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="card">

        <p className="progress">
          Question {currentIndex + 1} of {gameQuestions.length}
        </p>

        <div className="image-box">
          <img
            src={currentQuestion.image}
            alt="question"
            className="question-image"
          />
        </div>

        <h2 className="question-text">{currentQuestion.text}</h2>

        <div className="button-group">
          <button className="yes-btn" onClick={() => handleAnswer(true)}>
            ✔ YES
          </button>
          <button className="no-btn" onClick={() => handleAnswer(false)}>
            ✖ NO
          </button>
        </div>

        <button className="home-btn" onClick={() => setScreen("home")}>
          Home 🏠
        </button>

      </div>
    </div>
  );
}

export default App;
