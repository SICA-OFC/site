export default function BlockEnd({
  href1,
  href2,
  teamLogo1,
  teamLogo2,
  teamName1,
  teamName2,
  color1,
  color2,
}) {
  const colorMap = {
    orange: "bg-[#DE6D3D]",
    darkBlue: "bg-neutra-preta",
  };

  return (
    <div className="flex flex-row items-center">
      <div>
        <a
          href={href1}
          className="flex items-center w-[200px] h-[50px] bg-secundaria text-neutra-branca no-underline transition-all duration-300 hover:bg-neutra-preta"
        >
          <div className={`w-[10px] h-[50px] mr-5 ${colorMap[color1]}`} />
          <img className="w-[30px] h-auto mr-5" src={teamLogo1} alt={teamName1} />
          <p className="text-neutra-branca font-bold text-sm">{teamName1}</p>
        </a>
        <a
          href={href2}
          className="flex items-center w-[200px] h-[50px] bg-secundaria text-neutra-branca no-underline transition-all duration-300 hover:bg-neutra-preta mt-2"
        >
          <div className={`w-[10px] h-[50px] mr-5 ${colorMap[color2]}`} />
          <img className="w-[30px] h-auto mr-5" src={teamLogo2} alt={teamName2} />
          <p className="text-neutra-branca font-bold text-sm">{teamName2}</p>
        </a>
      </div>
    </div>
  );
}
