import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const EvolutionContainer = styled.div`
  margin-top: 2rem;
`;

const EvolutionTitle = styled.h3`
  margin-bottom: 1rem;
`;

const EvolutionChain = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const PokemonEvolution = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

const EvolveArrow = styled.div`
  font-size: 1.5rem;
  margin: 0 1rem;
  color: #666;

  @media (max-width: 768px) {
    transform: rotate(90deg);
    margin: 0.5rem 0;
  }
`;

const EvolutionCondition = styled.div`
  font-size: 0.8rem;
  color: #666;
  text-align: center;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
`;

const PokemonImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  ${props => props.isCurrentPokemon ? 'border: 2px solid #ef5350; border-radius: 50%;' : ''}
`;

const PokemonName = styled.div`
  margin-top: 0.5rem;
  text-align: center;
  text-transform: capitalize;
  ${props => props.isCurrentPokemon ? 'font-weight: bold; color: #ef5350;' : ''}
`;

const NoEvolutions = styled.div`
  text-align: center;
  color: #666;
`;

const EvolutionTree = ({ currentPokemon, allPokemons, onPokemonSelect, showShiny }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  // Fonction pour trouver la forme de base d'un Pokémon
  const findBaseForm = (pokemon, visited = new Set()) => {
    if (!pokemon || visited.has(pokemon.id)) return pokemon;
    visited.add(pokemon.id);

    // Si le Pokémon n'a pas d'évolution précédente, c'est la forme de base
    if (!pokemon.evolvedFrom || pokemon.evolvedFrom.length === 0) {
      return pokemon;
    }

    // Sinon, récursivement chercher la forme précédente
    const prevPokemonId = pokemon.evolvedFrom[0];
    const prevPokemon = allPokemons.find(p => p.id === prevPokemonId);
    
    if (!prevPokemon) return pokemon;
    return findBaseForm(prevPokemon, visited);
  };

  // Fonction pour construire la chaîne d'évolution complète à partir de la forme de base
  const buildCompleteEvolutionChain = (basePokemon, visited = new Set()) => {
    if (!basePokemon || visited.has(basePokemon.id)) return [];
    visited.add(basePokemon.id);

    const chain = [{
      pokemon: basePokemon,
      condition: null
    }];

    // Trouver toutes les évolutions suivantes
    const findEvolutions = (pokemon) => {
      if (!pokemon || !pokemon.evolvesTo) return;

      Object.entries(pokemon.evolvesTo).forEach(([evolveToId, evolutionCondition]) => {
        const nextPokemon = allPokemons.find(p => p.id === parseInt(evolveToId));
        if (nextPokemon && !visited.has(nextPokemon.id)) {
          visited.add(nextPokemon.id);
          chain.push({
            pokemon: nextPokemon,
            condition: evolutionCondition
          });

          // Chercher les évolutions suivantes de manière récursive
          findEvolutions(nextPokemon);
        }
      });
    };

    findEvolutions(basePokemon);
    return chain;
  };

  // Trouver la forme de base du Pokémon actuel
  const basePokemon = findBaseForm(currentPokemon);
  
  // Construire la chaîne d'évolution complète
  const evolutionChain = buildCompleteEvolutionChain(basePokemon);

  if (!evolutionChain || evolutionChain.length <= 1) {
    return (
      <EvolutionContainer>
        <EvolutionTitle>{t('evolutions')}</EvolutionTitle>
        <NoEvolutions>{t('noEvolutions')}</NoEvolutions>
      </EvolutionContainer>
    );
  }

  return (
    <EvolutionContainer>
      <EvolutionTitle>{t('evolutions')}</EvolutionTitle>
      <EvolutionChain>
        {evolutionChain.map((evolutionData, index, array) => {
          const { pokemon } = evolutionData;
          
          // Gérer le cas où pokemon.name est un objet avec fr/en
          const pokemonName = pokemon.name[currentLanguage] || pokemon.name.en || pokemon.name;
          const isCurrentPokemon = pokemon.id === currentPokemon.id;
          
          return (
            <React.Fragment key={pokemon.id}>
              <PokemonEvolution onClick={() => onPokemonSelect(pokemon)}>
                <PokemonImage 
                  src={showShiny ? pokemon.image_shiny : pokemon.image} 
                  alt={pokemonName}
                  isCurrentPokemon={isCurrentPokemon}
                />
                <PokemonName isCurrentPokemon={isCurrentPokemon}>
                  {pokemonName}
                </PokemonName>
              </PokemonEvolution>
              
              {index < array.length - 1 && (
                <>
                  <EvolveArrow>→</EvolveArrow>
                  {array[index + 1].condition && (
                    <EvolutionCondition>
                      {array[index + 1].condition}
                    </EvolutionCondition>
                  )}
                </>
              )}
            </React.Fragment>
          );
        })}
      </EvolutionChain>
    </EvolutionContainer>
  );
};

export default EvolutionTree;
