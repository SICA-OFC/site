import "./css/block.css";

export default function BlockUp({
  href1,
  href2,
  teamLogo1,
  teamLogo2,
  teamName1,
  teamName2,
  color1,
  color2,
}) {
  return (
    <div className="bracketBlock">
      <div>
        <a href={href1} className="block">
          <div className={color1}></div>
          <img className="teamLogo" src={teamLogo1} alt={teamName1} />
          <p className="p">{teamName1}</p>
        </a>
        <a href={href2} className="block">
          <div className={color2}></div>
          <img className="teamLogo" src={teamLogo2} alt={teamName2} />
          <p className="p">{teamName2}</p>
        </a>
      </div>
      <div className="bracket-connection">
        <div className="bracketEdge horizontalEdgeDown1"></div>
        <div className="bracketEdge verticalEdgeDown"></div>
        <div className="bracketEdge horizontalEdgeDown2"></div>
      </div>
    </div>
  );
}
