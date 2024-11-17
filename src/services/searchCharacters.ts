import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api/character";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  url: string;
}

interface APIResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

/**
 * Fetches characters from the Rick and Morty API with optional filters.
 * @param page - The page number for pagination.
 * @param filters - An object containing the filters (name, status, species, type, gender).
 * @returns A promise resolving to the API response.
 */
export const searchCharacters = async (page: number, filters: {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
}): Promise<APIResponse> => {
  try {
    const response = await axios.get<APIResponse>(BASE_URL, {
      params: {
        page,
        ...filters, // Spread the filters object to include each filter as a query parameter if it's provided
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching characters. Please try again.");
  }
};
