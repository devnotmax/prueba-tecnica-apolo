import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
}

// Contexto para el usuario
interface UserContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

// Contexto para los personajes
interface CharactersContextProps {
  characters: Character[];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  addCharacter: (newCharacter: Character) => void;
  editCharacter: (updatedCharacter: Character) => void;
  deleteCharacter: (id: number) => void;
}

const CharactersContext = createContext<CharactersContextProps | undefined>(undefined);

// Proveedor de Contexto para Usuario
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

interface CharactersProviderProps {
  children: ReactNode;
}

export const CharactersProvider: React.FC<CharactersProviderProps> = ({ children }) => {
  const [characters, setCharacters] = useState<Character[]>([]);

  // Cargar los personajes desde el localStorage al inicio
  useEffect(() => {
    const storedCharacters = localStorage.getItem("characters");
    if (storedCharacters) {
      setCharacters(JSON.parse(storedCharacters));
    }
  }, []);

  // Función para agregar un nuevo personaje
  const addCharacter = (newCharacter: Character) => {
    setCharacters((prevCharacters) => {
      const updatedCharacters = [...prevCharacters, newCharacter];
      localStorage.setItem("characters", JSON.stringify(updatedCharacters)); // Guardar en localStorage
      return updatedCharacters;
    });
  };

  // Función para editar un personaje existente
  const editCharacter = (updatedCharacter: Character) => {
    setCharacters((prevCharacters) => {
      const updatedCharacters = prevCharacters.map((character) =>
        character.id === updatedCharacter.id ? updatedCharacter : character
      );
      localStorage.setItem("characters", JSON.stringify(updatedCharacters)); // Guardar en localStorage
      return updatedCharacters;
    });
  };

  // Función para eliminar un personaje
  const deleteCharacter = (id: number) => {
    setCharacters((prevCharacters) => {
      const updatedCharacters = prevCharacters.filter((character) => character.id !== id);
      localStorage.setItem("characters", JSON.stringify(updatedCharacters)); // Guardar en localStorage
      return updatedCharacters;
    });
  };

  return (
    <CharactersContext.Provider value={{ characters, setCharacters, addCharacter, editCharacter, deleteCharacter }}>
      {children}
    </CharactersContext.Provider>
  );
};

// Custom hooks para acceder a los contextos
export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const useCharacters = (): CharactersContextProps => {
  const context = useContext(CharactersContext);
  if (!context) {
    throw new Error("useCharacters must be used within a CharactersProvider");
  }
  return context;
};
