import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

// Styles manquants
const StatsContainer = styled.div`
  margin-top: 2rem;
`;

const StatsTitle = styled.h3`
  margin-bottom: 1rem;
`;

const StatRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const StatName = styled.div`
  width: 120px;
  font-size: 0.9rem;
`;

const StatValue = styled.div`
  width: 40px;
  font-weight: bold;
  text-align: right;
  margin-right: 1rem;
`;

const StatBarContainer = styled.div`
  flex: 1;
  height: 10px;
  background-color: #eee;
  border-radius: 5px;
  overflow: hidden;
`;

const StatBar = styled.div`
  height: 100%;
  background-color: #ef5350;
  width: ${props => Math.min(props.value / 255 * 100, 100)}%;
`;

const PokemonStats = ({ stats }) => {
  const { t } = useTranslation();
  
  // Adapter ce code selon la structure exacte de vos données stats
  const formattedStats = [
    { name: 'hp', value: stats.hp || 0 },
    { name: 'attack', value: stats.atk || 0 },
    { name: 'defense', value: stats.def || 0 },
    { name: 'special-attack', value: stats.spe_atk || 0 },
    { name: 'special-defense', value: stats.spe_def || 0 },
    { name: 'speed', value: stats.vit || 0 }
  ];

  const statNames = {
    hp: t('hp'),
    attack: t('attack'),
    defense: t('defense'),
    'special-attack': t('specialAttack'),
    'special-defense': t('specialDefense'),
    speed: t('speed')
  };
  
  return (
    <StatsContainer>
      <StatsTitle>{t('stats')}</StatsTitle>
      {formattedStats.map(stat => (
        <StatRow key={stat.name}>
          <StatName>{statNames[stat.name] || stat.name}</StatName>
          <StatValue>{stat.value}</StatValue>
          <StatBarContainer>
            <StatBar value={stat.value} />
          </StatBarContainer>
        </StatRow>
      ))}
    </StatsContainer>
  );
};

export default PokemonStats;