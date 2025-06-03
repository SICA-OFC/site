import React from "react";
import "./css/profilePhotoUploader.css";

export default function ProfilePhotoUploader({ photoUrl, onPhotoChange }) {
  const fileInputRef = React.useRef(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onPhotoChange?.(reader.result); // envia a imagem convertida em base64
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-photo-uploader">
      <img
        id="profilePhoto"
        src={photoUrl}
        alt="Profile"
        onClick={handlePhotoClick}
      />
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="profile-icon"
        fill="#DE6C3C"
      >
        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
      </svg> */}
      <svg
        className="background-svg"
        width="500"
        height="32"
        viewBox="0 0 90 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.105469 0.470703C0.283114 0.940858 0.46826 1.40853 0.660871 1.87353C3.0727 7.69621 6.60778 12.9868 11.0643 17.4433C15.5208 21.8998 20.8114 25.4349 26.6341 27.8467C32.4567 30.2586 38.6974 31.4999 44.9999 31.4999C51.3023 31.4999 57.543 30.2586 63.3657 27.8467C69.1884 25.4349 74.479 21.8998 78.9355 17.4433C83.392 12.9868 86.927 7.69622 89.3389 1.87354C89.5315 1.40853 89.7166 0.940859 89.8943 0.470703H0.105469Z"
          fill="black"
          fill-opacity="0.5"
        />
      </svg>
      <svg
        className="camera-icon"
        width="800px"
        height="800px"
        viewBox="0 -2 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
      >
        <title>camera</title>
        <desc>Created with Sketch Beta.</desc>
        <defs></defs>
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
          sketch:type="MSPage"
        >
          <g
            id="Icon-Set-Filled"
            sketch:type="MSLayerGroup"
            transform="translate(-258.000000, -467.000000)"
            fill="#F18E2C"
          >
            <path
              d="M286,471 L283,471 L282,469 C281.411,467.837 281.104,467 280,467 L268,467 C266.896,467 266.53,467.954 266,469 L265,471 L262,471 C259.791,471 258,472.791 258,475 L258,491 C258,493.209 259.791,495 262,495 L286,495 C288.209,495 290,493.209 290,491 L290,475 C290,472.791 288.209,471 286,471 Z M274,491 C269.582,491 266,487.418 266,483 C266,478.582 269.582,475 274,475 C278.418,475 282,478.582 282,483 C282,487.418 278.418,491 274,491 Z M274,477 C270.687,477 268,479.687 268,483 C268,486.313 270.687,489 274,489 C277.313,489 280,486.313 280,483 C280,479.687 277.313,477 274,477 L274,477 Z"
              id="camera"
              sketch:type="MSShapeGroup"
            ></path>
          </g>
        </g>
      </svg>
      <input
        id="fileInput"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
}
