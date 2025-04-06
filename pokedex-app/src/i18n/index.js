import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      home: 'Accueil',
      search: 'Rechercher',
      generation: 'Génération',
      type: 'Type',
      sort: 'Trier par',
      number: 'Numéro',
      name: 'Nom',
      weight: 'Poids',
      height: 'Taille',
      ascending: 'Croissant',
      descending: 'Décroissant',
      stats: 'Statistiques',
      hp: 'PV',
      attack: 'Attaque',
      defense: 'Défense',
      specialAttack: 'Attaque Spéciale',
      specialDefense: 'Défense Spéciale',
      speed: 'Vitesse',
      evolutions: 'Évolutions',
      backToList: 'Retour à la liste',
      regular: 'Normal',
      shiny: 'Chromatique',
      // Ajout des types de Pokémon
      types: {
        normal: 'Normal',
        fire: 'Feu',
        water: 'Eau',
        electric: 'Électrik',
        grass: 'Plante',
        ice: 'Glace',
        fighting: 'Combat',
        poison: 'Poison',
        ground: 'Sol',
        flying: 'Vol',
        psychic: 'Psy',
        bug: 'Insecte',
        rock: 'Roche',
        ghost: 'Spectre',
        dragon: 'Dragon',
        dark: 'Ténèbres',
        steel: 'Acier',
        fairy: 'Fée'
      }
    }
  },
  en: {
    translation: {
      home: 'Home',
      search: 'Search',
      generation: 'Generation',
      type: 'Type',
      sort: 'Sort by',
      number: 'Number',
      name: 'Name',
      weight: 'Weight',
      height: 'Height',
      ascending: 'Ascending',
      descending: 'Descending',
      stats: 'Stats',
      hp: 'HP',
      attack: 'Attack',
      defense: 'Defense',
      specialAttack: 'Special Attack',
      specialDefense: 'Special Defense',
      speed: 'Speed',
      evolutions: 'Evolutions',
      backToList: 'Back to list',
      regular: 'Regular',
      shiny: 'Shiny',
      // Adding Pokémon types
      types: {
        normal: 'Normal',
        fire: 'Fire',
        water: 'Water',
        electric: 'Electric',
        grass: 'Grass',
        ice: 'Ice',
        fighting: 'Fighting',
        poison: 'Poison',
        ground: 'Ground',
        flying: 'Flying',
        psychic: 'Psychic',
        bug: 'Bug',
        rock: 'Rock',
        ghost: 'Ghost',
        dragon: 'Dragon',
        dark: 'Dark',
        steel: 'Steel',
        fairy: 'Fairy'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;