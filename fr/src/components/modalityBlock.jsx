export default function ModalityBlock({ modality, image, alt }) {
  return (
    <div className="relative flex flex-col items-center justify-center w-[425px] bg-[#f18e2c] rounded-b-[5px] transition-transform duration-300 hover:scale-[1.04]">
      <button className="w-[50px] h-[50px] absolute top-[10px] right-[10px] bg-[#001429b6] hover:bg-[#001429] border-transparent rounded-2xl cursor-pointer transition duration-300 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[35px] h-[35px]"
        >
          <path
            d="M10 11V17"
            stroke="#f5f5f5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 11V17"
            stroke="#f5f5f5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 7H20"
            stroke="#f5f5f5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
            stroke="#f5f5f5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
            stroke="#f5f5f5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <img className="w-full object-cover" src={image} alt={alt} />
      <div className="p-2">
        <h1 className="font-[energy] text-white">{modality}</h1>
      </div>
    </div>
  );
}
