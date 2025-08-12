import React from "react";

const MatchEditor = ({ team1, team2, onChange }) => {
  return (
    <div className="p-4 rounded-lg flex items-center justify-center mb-2">
      <input
        type="image"
        className="mx-2 w-[40%] p-2 rounded border border-[#f18e2c]"
      />
      <input
        type="text"
        value={team1}
        onChange={(e) => onChange(e.target.value, team2)}
        className="mx-2 w-[40%] p-2 rounded border border-[#f18e2c]"
        placeholder="Time 1"
      />
      <span className="mx-2">vs</span>
      <input
        type="text"
        value={team2}
        onChange={(e) => onChange(team1, e.target.value)}
        className="mx-2 w-[40%] p-2 rounded border border-[#f18e2c]"
        placeholder="Time 2"
      />
      <input
        type="image"
        className="mx-2 w-[40%] p-2 rounded border border-[#f18e2c]"
      />
    </div>
  );
};

export default MatchEditor;
