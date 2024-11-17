import React, { useState, ChangeEvent } from "react";
import "./EmailInput.css";

interface EmailInputProps {
  onValid: (isValid: boolean, value: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ onValid }) => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setValue(email);

    if (!validateEmail(email)) {
      setError("Invalid email address");
      setIsValid(false);
      onValid(false, email);
    } else {
      setError("");
      setIsValid(true);
      onValid(true, email);
    }
  };

  return (
    <div className="email-input-container">
      <label className="email-label">Email</label>
      <div className="input-wrapper">
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          className={`email-input ${isValid ? "valid" : ""}`}
          value={value}
          onChange={handleChange}
          required
        />
      </div>
      {error && <p className="email-error">{error}</p>}
    </div>
  );
};

export default EmailInput;
