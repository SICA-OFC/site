import { useRef, useState } from "react";
import profilePhoto from "../assets/profilePhoto.png";

export default function ProfileUploader({ file, onFileChange }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) return;

    console.log(fileObj);
    setPreview(URL.createObjectURL(fileObj));
    onFileChange(fileObj);
  };

  return (
    <div className="flex flex-col justify-baseline items-baseline gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleClick}
        className="block bg-black text-white p-2 font-semibold text-sm rounded-lg shadow hover:cursor-pointer hover:outline-blue-700 hover:outline-1 hover:bg-gray-800 transition"
      >
        Editar Foto
      </button>

      <img
        src={preview || file || profilePhoto }
        className="w-[100px] h-[100px] rounded-full border border-black bg-secundaria object-cover"
        alt="Preview"
      />
    </div>
  );
}
