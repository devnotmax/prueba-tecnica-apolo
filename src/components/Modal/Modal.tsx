import React, { useState } from "react";
import { useCharacters } from "../../contexts/UserContexts";
import "./Modal.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [characterName, setCharacterName] = useState<string>("");
    const [species, setSpecies] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [image, setImage] = useState<string>("");

    const { addCharacter } = useCharacters();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Crear el nuevo personaje
        const newCharacter = {
            id: Date.now(),
            name: characterName,
            species: species,
            gender: gender,
            status: status,
            image: image,
        };

        onSubmit(newCharacter);
        addCharacter(newCharacter);
        onClose();
    };

    return isOpen ? (
        <div className="modal">
            <div className="modal-content">
                <h2>Crear Personaje</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre del Personaje</label>
                        <input
                            type="text"
                            value={characterName}
                            onChange={(e) => setCharacterName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Especie</label>
                        <input
                            type="text"
                            value={species}
                            onChange={(e) => setSpecies(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Género</label>
                        <input
                            type="text"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Estado</label>
                        <input
                            type="text"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Imagen</label>
                        <input
                            type="url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="create-button">Crear Personaje</button>
                </form>
                <button onClick={onClose} className="close-button">Cerrar</button>
            </div>
        </div>
    ) : null;
};

export default Modal;
