import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import styled from 'styled-components';
import pokeballImage from '../../assets/pokeball.png'; // ← assure-toi d’avoir cette image

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ef5350;
  color: white;
`;

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 0.8rem;
`;

const LogoText = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  font-family: 'Pokemon Solid', sans-serif;
  letter-spacing: 1px;
`;

const CenterText = styled.div`
  text-align: center;
  line-height: 1.2;
  font-size: 0.75rem;
  font-style: italic;
  opacity: 0.9;
`;

const LanguageSelector = styled.div`
  display: flex;
  gap: 1rem;
`;

const LanguageButton = styled.button`
  background: ${props => props.$active ? '#fff' : 'transparent'};
  color: ${props => props.$active ? '#ef5350' : '#fff'};
  border: 1px solid white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
`;

const Header = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  return (
    <HeaderContainer>
      <LogoWrapper to="/">
        <LogoImage src={pokeballImage} alt="Pokédex logo" />
        <LogoText>Pokédex</LogoText>
      </LogoWrapper>

      <CenterText>
        BuildsByOmar<br />
        <span style={{ fontFamily: 'Arial', fontSize: '0.7rem' }}>et l'arabe</span>
      </CenterText>

      <LanguageSelector>
        <LanguageButton 
          $active={language === 'fr'} 
          onClick={() => changeLanguage('fr')}
        >
          FR
        </LanguageButton>
        <LanguageButton 
          $active={language === 'en'} 
          onClick={() => changeLanguage('en')}
        >
          EN
        </LanguageButton>
      </LanguageSelector>
    </HeaderContainer>
  );
};

export default Header;
