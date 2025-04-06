import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 1rem;
 
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
 
  @media (min-width: 768px) {
    flex: 1;
  }
`;

const Label = styled.label`
  font-weight: bold;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const SortContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Filters = ({ types, filters, updateFilters }) => {
  const { t, i18n } = useTranslation();
  const [generations, setGenerations] = useState([]);
  const currentLang = i18n.language; // Obtenir la langue actuelle
 
  // Texte "Tout" ou "All" selon la langue
  const allText = currentLang === 'fr' ? 'Tout' : 'All';
  
  // Créer dynamiquement les options de génération (1-9)
  useEffect(() => {
    const genOptions = [];
    for (let i = 1; i <= 9; i++) {
      genOptions.push({
        id: i,
        name: `${t('generation')} ${i}`
      });
    }
    setGenerations(genOptions);
  }, [t]);
 
  const handleSearchChange = (e) => {
    updateFilters({ search: e.target.value });
  };
 
  const handleTypeChange = (e) => {
    updateFilters({ type: e.target.value });
  };
 
  const handleGenerationChange = (e) => {
    updateFilters({ generation: e.target.value });
  };
 
  const handleSortChange = (e) => {
    updateFilters({ sort: e.target.value });
  };
 
  const handleOrderChange = (e) => {
    updateFilters({ order: e.target.value });
  };
 
  return (
    <FiltersContainer>
      <FilterGroup>
        <Label>{t('search')}</Label>
        <Input
          type="text"
          value={filters.search}
          onChange={handleSearchChange}
          placeholder={t('search')}
        />
      </FilterGroup>
     
      <FilterGroup>
        <Label>{t('type')}</Label>
        <Select value={filters.type} onChange={handleTypeChange}>
          <option value="">{allText}</option>
          {types.map(type => (
            <option key={type.id} value={type.id}>
              {type.name[currentLang]}
            </option>
          ))}
        </Select>
      </FilterGroup>
     
      <FilterGroup>
        <Label>{t('generation')}</Label>
        <Select value={filters.generation} onChange={handleGenerationChange}>
          <option value="">{allText}</option>
          {generations.map(gen => (
            <option key={gen.id} value={gen.id}>
              {gen.name}
            </option>
          ))}
        </Select>
      </FilterGroup>
     
      <FilterGroup>
        <Label>{t('sort')}</Label>
        <SortContainer>
          <Select value={filters.sort} onChange={handleSortChange}>
            <option value="id">{t('number')}</option>
            <option value="name">{t('name')}</option>
            <option value="weight">{t('weight')}</option>
            <option value="height">{t('height')}</option>
          </Select>
          <Select value={filters.order} onChange={handleOrderChange}>
            <option value="asc">{t('ascending')}</option>
            <option value="desc">{t('descending')}</option>
          </Select>
        </SortContainer>
      </FilterGroup>
    </FiltersContainer>
  );
};

export default Filters;