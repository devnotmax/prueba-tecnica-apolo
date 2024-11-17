import React, { useState, useEffect } from "react";
import { useCharacters } from "../contexts/UserContexts";
import OwnCharacterCard from "../components/Card/OwnCharacterCard";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
}

const PersonajesCreado: React.FC = () => {
  const { characters, setCharacters } = useCharacters();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const savedCharacters = localStorage.getItem("characters");
    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters));
    }
  }, [setCharacters]);

  const handleEditClick = (character: Character) => {
    setEditingCharacter(character);
    setIsModalOpen(true);
  };

  const handleSaveChanges = () => {
    if (editingCharacter) {
      const updatedCharacters = characters.map((character) =>
        character.id === editingCharacter.id ? editingCharacter : character
      );

      setCharacters(updatedCharacters);

      localStorage.setItem("characters", JSON.stringify(updatedCharacters));

      // Cerrar el modal
      setIsModalOpen(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingCharacter) {
      setEditingCharacter({
        ...editingCharacter,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div>
      <h1>Personajes Creados</h1>
      <p>Aqui puedes ver los personajes que has creado y editarlos tan solo presionando en la card del personaje que deseas editar</p>
      {characters.length === 0 ? (
        <p>No se han creado personajes aún.</p>
      ) : (
        <div className="characters-list">
          {characters.map((character) => (
            <div key={character.id} onClick={() => handleEditClick(character)}>
              <OwnCharacterCard
                id={character.id}
                name={character.name}
                image={character.image}
                status={character.status}
                species={character.species}
                gender={character.gender}
              />
            </div>
          ))}
        </div>
      )}

      {isModalOpen && editingCharacter && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editar Personaje</h2>
            <form>
              <div>
                <label>Nombre:</label>
                <input
                  type="text"
                  name="name"
                  value={editingCharacter.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Especie:</label>
                <input
                  type="text"
                  name="species"
                  value={editingCharacter.species}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Género:</label>
                <input
                  type="text"
                  name="gender"
                  value={editingCharacter.gender}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Estado:</label>
                <input
                  type="text"
                  name="status"
                  value={editingCharacter.status}
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                onClick={handleSaveChanges}
                disabled={
                  !editingCharacter.name ||
                  !editingCharacter.species ||
                  !editingCharacter.gender ||
                  !editingCharacter.status
                }
              >
                Guardar Cambios
              </button>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                Cerrar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonajesCreado;
