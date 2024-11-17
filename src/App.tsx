import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import EditCreate from "./pages/EditCreate";
import NavBar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import Modal from "./components/Modal/Modal";
import PersonajesCreado from "./pages/PersonajesCreados";
import { UserProvider } from "./contexts/UserContexts";
import { CharactersProvider } from "./contexts/UserContexts";
import "./App.css";

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSubmit = (data: any) => {
    console.log("Datos enviados:", data);
    closeModal(); // Cerrar el modal después de enviar
  };

  return (
    <UserProvider>
      <CharactersProvider>
        <div className="app-container">
          <NavBar openModal={openModal} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/personajes" element={<PersonajesCreado />} />
              <Route path="/editar" element={<EditCreate />} />
            </Routes>
          </main>
          <Footer />
          <Modal
            isOpen={showModal}
            onClose={closeModal}
            onSubmit={handleSubmit} // Llamamos a handleSubmit
          />
        </div>
      </CharactersProvider>
    </UserProvider>
  );
};

export default App;
