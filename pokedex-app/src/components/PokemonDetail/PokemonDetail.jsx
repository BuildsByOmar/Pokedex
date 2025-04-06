import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import PokemonStats from './PokemonStats';
import EvolutionTree from './EvolutionTree';
import { usePokemon } from '../../hooks/usePokemon';

const Container = styled.div`
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  background-color: #ef5350;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    background-color: #d32f2f;
  }
`;

const PokemonHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
  }
`;

const ImageContainer = styled.div`
  margin-right: 2rem;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const PokemonImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  object-fit: contain;
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const PokemonId = styled.div`
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const PokemonName = styled.h1`
  margin: 0 0 0.5rem 0;
  text-transform: capitalize;
`;

const PokemonGeneration = styled.div`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
`;

const TypesContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TypeBadge = styled.span`
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;
  text-transform: capitalize;
  background-color: ${props => getTypeColor(props.type)};
  color: white;
`;

const PhysicalInfo = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const PhysicalItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const PhysicalLabel = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const PhysicalValue = styled.div`
  font-size: 1rem;
`;

const ImageToggle = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ToggleButton = styled.button`
  background-color: ${props => props.$active ? '#ef5350' : '#f5f5f5'};
  color: ${props => props.$active ? 'white' : '#333'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.$active ? '#d32f2f' : '#e0e0e0'};
  }
`;

// Fonction pour obtenir la couleur en fonction du type
const getTypeColor = (type) => {
  const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };
  
  if (typeof type !== 'string') {
    return '#888888';
  }
  
  return typeColors[type.toLowerCase()] || '#888888';
};

// Fonction pour obtenir les informations du type
const getTypeInfo = (typeId, allTypes, currentLanguage) => {
  if (allTypes && allTypes.length) {
    const foundType = allTypes.find(t => t.id === typeId);
    if (foundType && foundType.name) {
      return { 
        name: foundType.name[currentLanguage] || foundType.name.en || '' ,
        nameEn: foundType.name.en || '',
      };
    }
  }
  return { name: '', nameEn: '' };
};


const PokemonDetail = ({ pokemon, onClose, onSelectPokemon }) => {
  const { t, i18n } = useTranslation();
  const [showShiny, setShowShiny] = useState(false);
  const { pokemons, types } = usePokemon(); // Utilisation du hook pour obtenir les types

  if (!pokemon) {
    return <div>{t('pokemonNotFound')}</div>;
  }

  const currentLanguage = i18n.language;
  const pokemonName = pokemon.name[currentLanguage] || pokemon.name.en;

  // Fonction pour gérer la sélection d'un Pokémon dans la chaîne d'évolution
  const handlePokemonSelect = (selectedPokemon) => {
    if (selectedPokemon.id !== pokemon.id) {
      onSelectPokemon(selectedPokemon);
    }
  };

  return (
    <Container>
      <BackButton onClick={onClose}>
        ← {t('backToList')}
      </BackButton>

      <PokemonHeader>
        <ImageContainer>
          <PokemonImage 
            src={showShiny ? pokemon.image_shiny : pokemon.image} 
            alt={pokemonName} 
          />
        </ImageContainer>

        <InfoContainer>
          <PokemonId>#{pokemon.id.toString().padStart(3, '0')}</PokemonId>
          <PokemonName>{pokemonName}</PokemonName>
          <PokemonGeneration>{t('generation')} {pokemon.generation}</PokemonGeneration>

          <TypesContainer>
            {pokemon.types && pokemon.types.map((typeId, index) => {
              const typeInfo = getTypeInfo(typeId, types, currentLanguage);
              return (
                <TypeBadge key={index} type={typeInfo.nameEn.toLowerCase()}>
                  {typeInfo.name}
                </TypeBadge>
              );
            })}
          </TypesContainer>

          <PhysicalInfo>
            <PhysicalItem>
              <PhysicalLabel>{t('height')}</PhysicalLabel>
              <PhysicalValue>{pokemon.height} m</PhysicalValue>
            </PhysicalItem>
            
            <PhysicalItem>
              <PhysicalLabel>{t('weight')}</PhysicalLabel>
              <PhysicalValue>{pokemon.weight} kg</PhysicalValue>
            </PhysicalItem>
          </PhysicalInfo>

          <ImageToggle>
            <ToggleButton $active={!showShiny} onClick={() => setShowShiny(false)}>
              {t('regular')}
            </ToggleButton>
            <ToggleButton $active={showShiny} onClick={() => setShowShiny(true)}>
              {t('shiny')}
            </ToggleButton>
          </ImageToggle>
        </InfoContainer>
      </PokemonHeader>

      <PokemonStats stats={pokemon.stats} />
      <EvolutionTree currentPokemon={pokemon} allPokemons={pokemons || []} onPokemonSelect={handlePokemonSelect} showShiny={showShiny} />
    </Container>
  );
};

export default PokemonDetail;