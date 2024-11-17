import React, { useState } from "react";
import "./Filters.css";  // Importa el archivo de estilos

interface FiltersProps {
  onFilterChange: (filters: { [key: string]: string }) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    status: "",
    species: "",
    gender: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Pasa los filtros al componente padre
  };

  return (
    <div className="filters">
      <select name="status" value={filters.status} onChange={handleChange}>
        <option value="">Selecciona estado</option>
        <option value="alive">Vivo</option>
        <option value="dead">Muerto</option>
        <option value="unknown">Desconocido</option>
      </select>
      <select name="species" value={filters.species} onChange={handleChange}>
        <option value="">Selecciona especie</option>
        <option value="Human">Humano</option>
        <option value="Alien">Extraterrestre</option>
        <option value="Robot">Robot</option>
      </select>
      <select name="gender" value={filters.gender} onChange={handleChange}>
        <option value="">Selecciona género</option>
        <option value="male">Masculino</option>
        <option value="female">Femenino</option>
        <option value="unknown">Desconocido</option>
      </select>
    </div>
  );
};

export default Filters;
