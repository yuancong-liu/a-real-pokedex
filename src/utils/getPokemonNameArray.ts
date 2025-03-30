import { PokeAPI } from 'pokeapi-types';

const LANG_TO_CHECK = ['ja-Hrkt', 'en', 'zh-Hant', 'zh-Hans'];

export const getPokemonNameArray = (names: Array<PokeAPI.Name>) =>
  LANG_TO_CHECK.map(
    (lang) => names.find((name) => name.language.name === lang)?.name,
  );

export const getPokemonFormName = (names: Array<PokeAPI.Name> | undefined) =>
  names ? names.find((name) => name.language.name === 'en')?.name : 'No Name';
