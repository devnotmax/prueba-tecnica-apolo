import React, { useState, ChangeEvent } from "react";
import "./PasswordInput.css";

interface PasswordInputProps {
  onValid: (isValid: boolean, value: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ onValid }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password: string) => {
    // Requisitos:
    // - Al menos 6 caracteres
    // - Al menos una letra mayúscula
    // - Al menos un número
    // - Al menos un símbolo especial
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setValue(password);

    if (!validatePassword(password)) {
      setError("Password must contain at least one uppercase letter, one lowercase letter, and one number");
      setIsValid(false);
      onValid(false, password);
    } else {
      setError("");
      setIsValid(true);
      onValid(true, password);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input-container">
      <label className="password-label">Password</label>
      <input
        name="password"
        type={showPassword ? "text" : "password"}
        id="password"
        value={value}
        onChange={handleChange}
        className={`password-input ${isValid ? "valid" : ""}`}
        placeholder="••••••••"
        required
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="password-toggle-visibility"
      >
        {showPassword ? (
          <>
            <i className="bx bx-hide mr-2 text-[1rem]"></i>
            Hide password
          </>
        ) : (
          <>
            <i className="bx bx-show mr-2 text-[1rem]"></i>
            Show password
          </>
        )}
      </button>
      {error && <p className="password-error">{error}</p>}
    </div>
  );
};

export default PasswordInput;
