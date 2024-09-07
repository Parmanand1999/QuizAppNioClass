import React, { useEffect, useState } from "react";
import FlashcardForm from "./Components/FlashcardForm";
import Flashcard from "./Components/Flashcard";
import QuizMode from "./Components/QuizMode";
// import ProgressTracker from './Components/ProgressTracker';

function App() {
  const [flashcards, setFlashcards] = useState(
    JSON.parse(localStorage.getItem("flashcards"))
  );
  const [quizMode, setQuizMode] = useState(false);

  const addFlashcard = (flashcardRes) => {
    const { answer, question } = flashcardRes;

    setFlashcards((flashcards) => [
      ...flashcards,
      { answer, question, id: Date.now(), correct: null },
    ]);
  };

  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
  }, [flashcards]);
  
  const handelDelete = (e, id) => {
    e.stopPropagation();

    const updatedFlashcards = flashcards.filter((card) => card.id !== id);

    setFlashcards(updatedFlashcards);
    localStorage.setItem("flashcards", JSON.stringify(updatedFlashcards));
  };
  return (
    <div className="h-[50%] w-[60%] mx-auto mt-[10%] bg-gray-200 p-5">
      <h1 className="text-3xl text-center font-bold mb-4">Flashcard App</h1>
      {!quizMode ? (
        <>
          <FlashcardForm addFlashcard={addFlashcard} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {flashcards.map((card) => (
              <Flashcard
                key={card.id}
                flashcard={card}
                handelDelete={handelDelete}
              />
            ))}
          </div>
          {flashcards.length > 0 && (
            <button
              className="mt-5 p-2 bg-blue-500 text-white rounded"
              onClick={() => setQuizMode(true)}
            >
              Start Quiz
            </button>
          )}
        </>
      ) : (
        <QuizMode
          flashcards={flashcards}
          setQuizMode={setQuizMode}
          setFlashcards={setFlashcards}
        />
      )}
    </div>
  );
}

export default App;
