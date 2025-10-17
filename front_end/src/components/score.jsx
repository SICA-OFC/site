import React, { useState } from "react";

function Score({ team }) {
  const [score, setScore] = useState(0);

  const raiseScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-base sm:text-lg md:text-xl font-semibold text-secundaria">
        {team}
      </h2>
      <button
        onClick={raiseScore}
        className="text-2xl sm:text-3xl w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-destaque border-1 text-white font-bold hover:bg-neutra-branca hover:text-destaque hover:border-destaque transition duration-300 cursor-pointer"
      >
        {score}
      </button>
    </div>
  );
}

export default Score;
