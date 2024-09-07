import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
function Flashcard({ flashcard ,handelDelete}) {
  const [flipped, setFlipped] = useState(false);
  

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer p-2 bg-white shadow-md rounded flex items-center justify-center"
    >
      {flipped ? flashcard.answer : flashcard.question}{" "}
      <span className="text-red-500 ml-auto mr-2 border p-1 rounded-xl hover:bg-slate-300 "
      onClick={(e)=>handelDelete(e,flashcard.id)}
      >
      <MdDelete />
      </span>
    </div>
  );
}

export default Flashcard;
