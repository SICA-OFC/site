export default function BlockDown({
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
    darkBlue: "bg-[#001429]",
  };

  return (
    <div className="flex flex-row items-center">
      <div>
        <a
          href={href1}
          className="flex items-center w-[200px] h-[50px] bg-[#092843] text-[#f5f5f5] no-underline transition-all duration-300 hover:bg-[#001429]"
        >
          <div className={`w-[10px] h-[50px] mr-5 ${colorMap[color1]}`} />
          <img className="w-[30px] h-auto mr-5" src={teamLogo1} alt={teamName1} />
          <p className="text-[#f5f5f5] font-bold text-sm">{teamName1}</p>
        </a>
        <a
          href={href2}
          className="flex items-center w-[200px] h-[50px] bg-[#092843] text-[#f5f5f5] no-underline transition-all duration-300 hover:bg-[#001429] mt-2"
        >
          <div className={`w-[10px] h-[50px] mr-5 ${colorMap[color2]}`} />
          <img className="w-[30px] h-auto mr-5" src={teamLogo2} alt={teamName2} />
          <p className="text-[#f5f5f5] font-bold text-sm">{teamName2}</p>
        </a>
      </div>

      {/* Conexões em L (para baixo) */}
      <div className="relative w-full h-full">
        {/* Horizontal superior */}
        <div className="pointer-events-none absolute h-[2px] w-[40px] border-b-2 border-[#001429] top-1/2 left-[20px] translate-x-[35%] translate-y-[-50px] z-[2]" />
        {/* Vertical */}
        <div className="pointer-events-none absolute w-[20px] h-[50px] border-r-2 border-[#001429] top-1/2 left-0 -translate-y-[100%] translate-x-[80%]" />
        {/* Horizontal inferior */}
        <div className="pointer-events-none absolute h-[2px] w-[40px] border-b-2 border-[#001429] top-1/2 left-[20px] -translate-x-[60%] z-[2]" />
      </div>
    </div>
  );
}
