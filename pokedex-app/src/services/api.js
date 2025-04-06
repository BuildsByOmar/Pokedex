import axios from 'axios';

const API_URL = 'https://pokedex-api.3rgo.tech/api';

// Configurer Axios avec les en-têtes CORS
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false
});

export const fetchAllPokemons = async () => {
  try {
    const response = await axiosInstance.get('/pokemon');
    return response.data.data; // Accès au tableau "data" dans la réponse
  } catch (error) {
    console.error('Error fetching pokemon list:', error);
    throw error;
  }
};

export const fetchPokemonById = async (id) => {
  try {
    const response = await axiosInstance.get(`/pokemon/${id}`);
    return response.data.data; // Accès aux données dans la clé "data"
  } catch (error) {
    console.error(`Error fetching pokemon #${id}:`, error);
    throw error;
  }
};

export const fetchTypes = async () => {
  try {
    const response = await axiosInstance.get('/types');
    return response.data.data; // Accès aux données dans la clé "data"
  } catch (error) {
    console.error('Error fetching types:', error);
    throw error;
  }
};

export const buildEvolutionChain = (allPokemons, currentPokemon) => {
  // Trouver tous les Pokémon dont currentPokemon évolue
  const evolvesFrom = currentPokemon.evolvedFrom || [];
  
  // Trouver tous les Pokémon vers lesquels currentPokemon évolue
  const evolvesTo = currentPokemon.evolvesTo || {};
  
  const evolutionChain = {
    current: currentPokemon,
    previous: evolvesFrom.length > 0 
      ? allPokemons.find(p => p.id === evolvesFrom[0]) 
      : null,
    next: Object.keys(evolvesTo).map(id => ({
      pokemon: allPokemons.find(p => p.id === parseInt(id)),
      condition: evolvesTo[id]
    }))
  };
  
  return evolutionChain;
};