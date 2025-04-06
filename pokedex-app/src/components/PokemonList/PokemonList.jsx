import React, { useState } from 'react';
import PokemonCard from './PokemonCard';
import Filters from '../Filters/Filters';
import { usePokemon } from '../../hooks/usePokemon';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import PokemonDetail from '../PokemonDetail/PokemonDetail';

const Container = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: red;
  font-size: 1.2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
 
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  grid-column: 1 / -1;
`;

// Nouveaux styles pour la modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 20px;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const PokemonList = () => {
  const { t } = useTranslation();
  const { pokemons, types, generations, loading, error, filters, updateFilters } = usePokemon();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  
  if (loading) return <LoadingMessage>{t('loading')}</LoadingMessage>;
  if (error) return <ErrorMessage>{t('error')}: {error}</ErrorMessage>;
  
  const handleSelect = (pokemon) => setSelectedPokemon(pokemon);
  const handleCloseDetail = () => setSelectedPokemon(null);
  
  const formattedGenerations = Array.isArray(generations) && typeof generations[0] === 'number'
    ? generations.map(gen => ({ id: gen, name: `${t('generation')} ${gen}` }))
    : generations;
  
  return (
    <Container>
      <Filters
        types={types}
        generations={formattedGenerations}
        filters={filters}
        updateFilters={updateFilters}
      />
      
      <Grid>
        {pokemons.length === 0 ? (
          <NoResults>{t('noResults')}</NoResults>
        ) : (
          pokemons.map(pokemon => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              allTypes={types}
              onClick={handleSelect}
            />
          ))
        )}
      </Grid>
      
      {selectedPokemon && (
        <ModalOverlay onClick={handleCloseDetail}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <PokemonDetail 
              pokemon={selectedPokemon} 
              onClose={handleCloseDetail} 
              onSelectPokemon={handleSelect} 
            />
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default PokemonList;