import React from "react";
import "./css/matchEditor.css";

const MatchEditor = ({ team1, team2, onChange }) => {
  return (
    <div className="container">
      <input type="image" className="input" />
      <input
        type="text"
        value={team1}
        onChange={(e) => onChange(e.target.value, team2)}
        className="input"
        placeholder="Time 1"
      />
      <span className="span">vs</span>
      <input
        type="text"
        value={team2}
        onChange={(e) => onChange(team1, e.target.value)}
        className="input"
        placeholder="Time 2"
      />
      <input type="image" className="input" />
    </div>
  );
};

export default MatchEditor;
