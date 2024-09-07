import React, { useState } from "react";
import ProgressTracker from "./ProgressTracker";

function QuizMode({ flashcards, setQuizMode, setFlashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const currentCard = flashcards[currentIndex];

  const handleAnswer = (correct) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[currentIndex].correct = correct;
    setFlashcards(updatedFlashcards);

    if (correct) setScore(score + 1);

    if (currentIndex + 1 < flashcards.length) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    } else {
      
      setShowPopup(true); 
      setTimeout(() => {
        setShowPopup(false); 
        setQuizMode(false); 
      }, 4000); 
    }
  };
  return (
    <div className="space-y-5">
      {currentCard && (
        <>
          <div
            onClick={() => setFlipped(!flipped)}
            className="cursor-pointer p-5 bg-white shadow-md rounded flex items-center justify-center"
          >
            {flipped ? currentCard.answer : currentCard.question}
          </div>
          {flipped && (
            <div className="space-x-4">
              <button
                onClick={() => handleAnswer(true)}
                className="p-2 bg-green-500 text-white rounded"
              >
                Correct
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="p-2 bg-red-500 text-white rounded"
              >
                Incorrect
              </button>
            </div>
          )}
        </>
      )}
      <ProgressTracker score={score} total={flashcards.length} />

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-lg">
              Your Score: {score} / {flashcards.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizMode;
