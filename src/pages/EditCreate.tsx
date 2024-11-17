import React, { useState } from "react";
import Modal from "../components/Modal/Modal";
import { useCharacters } from "../contexts/UserContexts";

const EditCreate: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [characters, setCharacters] = useState<any[]>([]);
    const { addCharacter } = useCharacters();

    const handleCreateEdit = (newCharacter: any) => {
        setCharacters([...characters, newCharacter]);
        addCharacter(newCharacter);
        setShowModal(false);
    };

    return (
        <div>
            <h1>Página de Creación/Edición</h1>
            <button onClick={() => setShowModal(true)}>Crear Personaje</button>
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleCreateEdit}
            />
            <h2>Lista de Personajes</h2>
            <ul>
                {characters.map((character, index) => (
                    <li key={index}>
                        <h3>{character.name}</h3>
                        <p>{character.species} | {character.gender} | {character.status}</p>
                        <img src={character.image} alt={character.name} width={100} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EditCreate;
