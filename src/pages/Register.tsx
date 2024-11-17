import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form/Form";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      // Si el usuario ya está autenticado, redirige a la página principal o cualquier otra página
      navigate("/");
    }
  }, [navigate]);

  const handleRegister = (data: { email: string; password: string; name: string }) => {
    console.log("Registro exitoso", data);
    navigate("/login");
  };

  return (
    <div className="register-container">
      <h2>Registrarse</h2>
      <Form onSubmit={handleRegister} type="register" />
    </div>
  );
};

export default RegisterPage;
