import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharactersByID } from "../services/getCharactersByID";

interface Character {
    id: number;
    name: string;
    image: string;
    status: string;
    species: string;
    gender: string;
    origin: { name: string };
    location: { name: string };
    episode: string[];
}

const CharacterDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchCharacter = async () => {
            if (id) {
                try {
                    const data = await getCharactersByID(parseInt(id));
                    setCharacter(data);
                } catch (err) {
                    setError("Error al cargar los detalles del personaje.");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchCharacter();
    }, [id]);

    if (loading) {
        return <p>Cargando detalles...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {character && (
                <>
                    <div className="character-detail-container">
                        <div>
                            <img src={character.image} alt={character.name} />
                            <h3>{character.name}</h3>
                        </div>
                        <div>
                            <p>
                                <strong>Species:</strong> {character.species}
                            </p>
                            <p>
                                <strong>Gender:</strong> {character.gender}
                            </p>
                            <p>
                                <strong>Status:</strong> {character.status}
                            </p>
                            <p>
                                <strong>Origin:</strong> {character.origin.name}
                            </p>
                            <p>
                                <strong>Location:</strong> {character.location.name}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CharacterDetail;
