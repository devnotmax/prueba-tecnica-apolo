const apiUrl = "https://rickandmortyapi.com/api/character";

export const getCharacters = async (page: number = 1) => {
  const response = await fetch(`${apiUrl}?page=${page}`);
  const data = await response.json();
  return data;
};
