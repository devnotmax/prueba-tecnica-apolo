import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import "./searchBar.css";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  searchTerm: string; // Recibe el searchTerm como prop
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchTerm }) => {
  const [term, setTerm] = useState(searchTerm); // Estado local para el input

  useEffect(() => {
    setTerm(searchTerm); // Si el searchTerm cambia, actualiza el valor del input
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(term);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search..."
        value={term}
        onChange={handleInputChange}
        className="search-bar"
      />
      <Button text="Search" onClick={handleSearchClick} />
    </div>
  );
};

export default SearchBar;
