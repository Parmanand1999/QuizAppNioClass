import React, { useState } from 'react';

function FlashcardForm({addFlashcard}) {
  // Using a single state for both question and answer
  const [flashcard, setFlashcard] = useState({
    question: '',
    answer: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (flashcard.question !== '' && flashcard.answer !== '') {

      // localStorage.setItem('flashcard', JSON.stringify(flashcard));
      // Clear the inputs by resetting the state
      addFlashcard(flashcard)
      setFlashcard({ question: '', answer: '' });
    } else {
      alert('Please fill in both the question and answer fields.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Spread the previous state and update only the changed field
    setFlashcard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm">Question:</label>
        <input
          type="text"
          name="question"
          value={flashcard.question}
          onChange={handleInputChange}
          className="border p-2 rounded w-full outline-none"
        />
      </div>
      <div>
        <label className="block text-sm">Answer:</label>
        <input
          type="text"
          name="answer"
          value={flashcard.answer}
          onChange={handleInputChange}
          className="border p-2 rounded w-full outline-none"
        />
      </div>
      <button type="submit" className="p-2 bg-green-500 text-white rounded">Add Flashcard</button>
    </form>
  );
}

export default FlashcardForm;
