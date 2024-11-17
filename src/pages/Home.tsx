import React, { useState, useEffect } from "react";
import Card from "../components/Card/Card";
import SearchBar from "../components/SearchBar/SearchBar";
import Filters from "../components/Filters/Filters";
import { getCharacters } from "../services/getCharacters";
import { searchCharacters } from "../services/searchCharacters";
import ClipLoader from "react-spinners/ClipLoader";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
}

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState({
    status: "",
    species: "",
    gender: "",
  });

  const fetchCharacters = async (page: number) => {
    setLoading(true);
    try {
      const data = await getCharacters(page);
      setCharacters(data.results);
      setTotalPages(data.info.pages);
      setError("");
    } catch (err) {
      setError("Error al cargar los personajes");
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredCharacters = async (page: number, filters: any) => {
    setLoading(true);
    setError("");
    try {
      const data = await searchCharacters(page, filters);
      if (data.results.length === 0) {
        setError("No se encontraron personajes con esos filtros.");
      }
      setCharacters(data.results);
      setTotalPages(data.info.pages);
    } catch (err) {
      setError("Error al aplicar los filtros.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm || Object.values(filters).some((filter) => filter !== "")) {
      fetchFilteredCharacters(currentPage, { ...filters, name: searchTerm });
    } else {
      fetchCharacters(currentPage);
    }
  }, [currentPage, searchTerm, filters]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <ClipLoader size={50} color="#4CAF50" loading={loading} />
        <p>Cargando personajes...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1>Personajes</h1>
      <div className="filters-container">
        <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
        <Filters onFilterChange={handleFilterChange} />
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="cards-container">
        {characters.length > 0 ? (
          characters.map((character) => (
            <Card
              key={character.id}
              id={character.id}
              name={character.name}
              image={character.image}
              status={character.status}
              species={character.species}
              gender={character.gender}
            />
          ))
        ) : (
          <div className="no-results">
            <p>No se encontraron personajes con los filtros aplicados.</p>
          </div>
        )}
      </div>
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>Anterior</button>
        )}
        <span>
          Página {currentPage} de {totalPages}
        </span>
        {currentPage < totalPages && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>Siguiente</button>
        )}
      </div>
    </div>
  );
};

export default Home;
