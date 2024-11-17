import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form/Form";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = (data: { email: string; password: string }) => {
    console.log("Inicio de sesión exitoso", data);
    navigate("/");
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <Form onSubmit={handleLogin} type="login" />
    </div>
  );
};

export default LoginPage;
