import React, { useState, ChangeEvent } from "react";
import "./NameInput.css";

interface NameInputProps {
  onValid: (isValid: boolean, value: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ onValid }) => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  const validateName = (name: string) => {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return nameRegex.test(name);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setValue(name);
    if (!validateName(name)) {
      setError("Invalid name");
      setIsValid(false);
      onValid(false, name);
    } else {
      setError("");
      setIsValid(true);
      onValid(true, name);
    }
  };

  return (
    <div className="name-input-container">
      <label className="name-label">Name</label>
      <div className="input-wrapper">
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          className={`name-input ${isValid ? "valid" : ""}`}
          value={value}
          onChange={handleChange}
          required
        />
      </div>
      {error && <p className="name-error">{error}</p>}
    </div>
  );
};

export default NameInput;
