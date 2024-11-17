import React from "react";
import { useUser } from "../../contexts/UserContexts";
import { useCharacters } from "../../contexts/UserContexts";

interface NavBarProps {
  openModal: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ openModal }) => {
  const { user, logout } = useUser();
  const { characters } = useCharacters();

  return (
    <nav className="navbar">
      <div className="container flex align-center space-between">
        {/* Logo */}
        <a href="/" className="nav-logo">
          MyApp
        </a>

        {/* Links */}
        <ul className="nav-links flex align-center">
          <li>
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          <li>
            <button onClick={openModal} className="nav-link">
              Create/Edit
            </button>
          </li>

          {user && characters.length > 0 && (
            <li>
              <a href="/personajes" className="nav-link">
                Personajes Creados
              </a>
            </li>
          )}

          {!user ? (
            <>
              <li>
                <a href="/login" className="nav-link button danger small">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="nav-link button small">
                  Register
                </a>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={logout}
                className="nav-link button small danger"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
