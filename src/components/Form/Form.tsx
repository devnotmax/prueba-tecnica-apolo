import React, { useState, useEffect } from "react";
import SweetAlert2 from "sweetalert2";
import EmailInput from "../inputs/Email";
import PasswordInput from "../inputs/Password";
import NameInput from "../inputs/Name";
import { useNavigate } from "react-router-dom";
import "./Form.css";

interface FormProps<T> {
  onSubmit: (data: T) => void;
  type: "login" | "register";
}

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  email: string;
  password: string;
  name: string;
};

const Form = <T extends LoginData | RegisterData>({ onSubmit, type }: FormProps<T>) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const handleEmailValid = (isValid: boolean, value: string) => {
    setEmailValid(isValid && validateEmail(value));
    setEmail(value);
  };

  const handlePasswordValid = (isValid: boolean, value: string) => {
    setPasswordValid(isValid && value.length >= 6);
    setPassword(value);
  };

  const handleNameValid = (isValid: boolean, value: string) => {
    setNameValid(isValid && value.length > 0); // Nombre no vacío
    setName(value);
  };

  // Manejo del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (emailValid && passwordValid && (type === "login" || nameValid)) {
      if (type === "register") {
        // Guardar usuario en localStorage
        localStorage.setItem("user", JSON.stringify({ email, password, name }));

        SweetAlert2.fire({
          title: "¡Registro exitoso!",
          text: "Te has registrado correctamente.",
          icon: "success",
          confirmButtonText: "Ir al Login",
        }).then(() => {
          window.location.href = "/login";
        });
      } else {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          if (user.email === email && user.password === password) {
            SweetAlert2.fire({
              title: "¡Bienvenido!",
              text: `Inicio de sesión exitoso, ${user.name}`,
              icon: "success",
            });
            onSubmit({ email, password, name: user.name } as T);
          } else {
            SweetAlert2.fire({
              title: "Error",
              text: "Correo electrónico o contraseña incorrectos.",
              icon: "error",
            });
          }
        } else {
          SweetAlert2.fire({
            title: "Error",
            text: "No se encontró ningún usuario registrado.",
            icon: "error",
          });
        }
      }
    } else {
      SweetAlert2.fire({
        title: "Error",
        text: "Por favor, completa el formulario correctamente.",
        icon: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {type === "register" && (
        <NameInput onValid={handleNameValid} />
      )}
      <EmailInput onValid={handleEmailValid} />
      <PasswordInput onValid={handlePasswordValid} />

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-primary-color text-white rounded"
        disabled={!emailValid || !passwordValid || (type === "register" && !nameValid)}
      >
        {type === "login" ? "Iniciar sesión" : "Registrarse"}
      </button>
    </form>
  );
};

export default Form;
