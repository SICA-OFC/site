import React from "react";

export default function ProfilePhotoUploader({ photoUrl, onPhotoChange }) {
  const fileInputRef = React.useRef(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onPhotoChange?.(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center w-[300px] h-[300px] rounded-full border border-[#0C2442] bg-[#092843] cursor-pointer overflow-hidden"
      onClick={handlePhotoClick}
    >
      <img
        src={photoUrl}
        alt="Profile"
        className="absolute z-[2] w-fit h-fit"
      />

      {/* Background SVG */}
      <svg
        className="absolute top-[100px] w-[300px] h-[300px] z-[3]"
        width="500"
        height="32"
        viewBox="0 0 90 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.105469 0.470703C0.283114 0.940858 0.46826 1.40853 0.660871 1.87353C3.0727 7.69621 6.60778 12.9868 11.0643 17.4433C15.5208 21.8998 20.8114 25.4349 26.6341 27.8467C32.4567 30.2586 38.6974 31.4999 44.9999 31.4999C51.3023 31.4999 57.543 30.2586 63.3657 27.8467C69.1884 25.4349 74.479 21.8998 78.9355 17.4433C83.392 12.9868 86.927 7.69622 89.3389 1.87354C89.5315 1.40853 89.7166 0.940859 89.8943 0.470703H0.105469Z"
          fill="black"
          fillOpacity="0.5"
        />
      </svg>

      {/* Camera Icon */}
      <svg
        className="absolute bottom-[25px] w-[50px] h-[50px] z-[4] text-white"
        width="800px"
        height="800px"
        viewBox="0 -2 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="#F18E2C">
          <path d="M286,471 L283,471 L282,469 C281.411,467.837 281.104,467 280,467 L268,467 C266.896,467 266.53,467.954 266,469 L265,471 L262,471 C259.791,471 258,472.791 258,475 L258,491 C258,493.209 259.791,495 262,495 L286,495 C288.209,495 290,493.209 290,491 L290,475 C290,472.791 288.209,471 286,471 Z M274,491 C269.582,491 266,487.418 266,483 C266,478.582 269.582,475 274,475 C278.418,475 282,478.582 282,483 C282,487.418 278.418,491 274,491 Z M274,477 C270.687,477 268,479.687 268,483 C268,486.313 270.687,489 274,489 C277.313,489 280,486.313 280,483 C280,479.687 277.313,477 274,477 L274,477 Z" />
        </g>
      </svg>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
