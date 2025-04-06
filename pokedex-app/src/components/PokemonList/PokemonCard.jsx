import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Card = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.div`
  background-color: #f5f5f5;
  padding: 1rem;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
`;

const CardInfo = styled.div`
  padding: 1rem;
  background-color: white;
`;

const PokemonId = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const PokemonName = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  text-transform: capitalize;
`;

const Generation = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const TypesContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

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

  if (typeof type !== 'string') return '#888888';
  return typeColors[type.toLowerCase()] || '#888888';
};

const TypeBadge = styled.span`
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  text-transform: capitalize;
  background-color: ${props => getTypeColor(props.type)};
  color: white;
`;

const getTypeInfo = (typeId, allTypes, currentLanguage) => {
  if (allTypes && allTypes.length) {
    const foundType = allTypes.find(t => t.id === typeId);
    if (foundType && foundType.name) {
      return {
        name: foundType.name[currentLanguage] || foundType.name.en || 'Unknown',
        key: foundType.name.en?.toLowerCase() || 'unknown'
      };
    }
  }

  return { name: 'Unknown', key: 'unknown' };
};

const PokemonCard = ({ pokemon, allTypes = [], onClick }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const pokemonName = pokemon.name[currentLanguage] || pokemon.name.en || 'Unknown';

  const handleClick = () => {
    onClick(pokemon);
  };

  return (
    <Card onClick={handleClick}>
      <CardImage>
        <Image src={pokemon.image} alt={pokemonName} />
      </CardImage>
      <CardInfo>
        <PokemonId>#{pokemon.id.toString().padStart(3, '0')}</PokemonId>
        <PokemonName>{pokemonName}</PokemonName>
        <Generation>Gen {pokemon.generation}</Generation>
        <TypesContainer>
          {pokemon.types && pokemon.types.map((typeId, index) => {
            const typeInfo = getTypeInfo(typeId, allTypes, currentLanguage);
            return (
              <TypeBadge key={index} type={typeInfo.key}>
                {typeInfo.name}
              </TypeBadge>
            );
          })}
        </TypesContainer>
      </CardInfo>
    </Card>
  );
};

export default PokemonCard;
