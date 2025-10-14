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
  // Cores customizadas
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

      {/* Conexões em L */}
      <div className="relative w-full h-full">
        {/* Vertical */}
        <div className="pointer-events-none absolute w-[20px] h-[50px] border-r-2 border-neutra-preta top-1/2 left-0 translate-y-[3%] translate-x-[80%]" />
        {/* Horizontal superior */}
        <div className="pointer-events-none absolute h-[2px] w-[40px] border-b-2 border-neutra-preta top-1/2 left-[20px] -translate-x-[60%] z-[2]" />
        {/* Horizontal inferior */}
        <div className="pointer-events-none absolute h-[2px] w-[40px] border-b-2 border-neutra-preta top-1/2 left-[20px] translate-x-[35%] translate-y-[50px] z-[2]" />
      </div>
    </div>
  );
}
