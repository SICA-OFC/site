import { useRef } from "react";

const CodeInput = ({ value, onChange, className }) => {
  const inputRefs = useRef(Array(6).fill(null));

  const handleInputChange = (e, index) => {
    const newValue = e.target.value.replace(/\D/g, ''); 
    if (!newValue && value[index] === '') return;

    const newCode = [...value];
    newCode[index] = newValue.slice(-1); 
    onChange(newCode);

    if (newValue && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e, startIndex) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("Text");
    const chars = paste.replace(/\D/g, "").split("").slice(0, 6 - startIndex);
    
    if (chars.length === 0) return;

    const newCode = [...value];
    chars.forEach((c, i) => {
      newCode[startIndex + i] = c;
    });
    onChange(newCode);

    const nextIndex = Math.min(startIndex + chars.length, inputRefs.current.length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') return;

    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End'
    ];

    if (!allowedKeys.includes(e.key) && isNaN(parseInt(e.key, 10))) {
      e.preventDefault();
    }

    if (e.key === "Backspace" && !e.target.value && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className={className}>
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={value[index] || ''}
          ref={(el) => (inputRefs.current[index] = el)}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          className="code-input"    
        />
      ))}
    </div>
  );
};

export default CodeInput;