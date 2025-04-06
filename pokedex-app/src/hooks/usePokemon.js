import { useState, useEffect } from 'react';
import { fetchAllPokemons, fetchTypes } from '../services/api';

export const usePokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    generation: '',
    sort: 'id',
    order: 'asc'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Ne récupérer que les pokemons et les types
        const [pokemonsData, typesData] = await Promise.all([
          fetchAllPokemons(),
          fetchTypes(),
        ]);
        
        setPokemons(pokemonsData);
        setFilteredPokemons(pokemonsData);
        setTypes(typesData);
        
        // Extraire les générations directement des données Pokémon
        const uniqueGenerations = [...new Set(pokemonsData.map(pokemon => pokemon.generation))]
          .sort((a, b) => a - b);
        
        setGenerations(uniqueGenerations);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...pokemons];
    
    // Filtrage par recherche
    if (filters.search) {
      result = result.filter(pokemon => {
        // Vérifier si pokemon.name est un objet avec des propriétés fr/en ou une chaîne
        const pokemonName = typeof pokemon.name === 'object' 
          ? pokemon.name.fr || pokemon.name.en 
          : pokemon.name;
        
        return pokemonName.toLowerCase().includes(filters.search.toLowerCase());
      });
    }
    
    // Filtrage par type
    if (filters.type) {
      result = result.filter(pokemon => 
        // Vérifier si types est un tableau d'objets ou d'identifiants
        Array.isArray(pokemon.types) && 
        pokemon.types.some(type => {
          if (typeof type === 'object') {
            return type.name === filters.type || type.id === filters.type;
          }
          return type === parseInt(filters.type) || type === filters.type;
        })
      );
    }
    
    // Filtrage par génération
    if (filters.generation) {
      result = result.filter(pokemon =>
        pokemon.generation === parseInt(filters.generation)
      );
    }
    
    // Tri
    result.sort((a, b) => {
      let compareValue;
      
      switch (filters.sort) {
        case 'name':
          // Gestion des noms qui peuvent être des objets avec fr/en
          const nameA = typeof a.name === 'object' ? a.name.fr || a.name.en : a.name;
          const nameB = typeof b.name === 'object' ? b.name.fr || b.name.en : b.name;
          compareValue = nameA.localeCompare(nameB);
          break;
        case 'weight':
          compareValue = a.weight - b.weight;
          break;
        case 'height':
          compareValue = a.height - b.height;
          break;
        default: // id
          compareValue = a.id - b.id;
      }
      
      return filters.order === 'asc' ? compareValue : -compareValue;
    });
    
    setFilteredPokemons(result);
  }, [pokemons, filters]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    pokemons: filteredPokemons,
    allPokemons: pokemons,
    types,
    generations,
    loading,
    error,
    filters,
    updateFilters
  };
};