export const BASE_URL = 'https://pokeapi.co/api/v2/';

export const getPokeApiPathname = (url: string) => {
  const baseUrlObj = new URL(BASE_URL);
  const urlObj = new URL(url);

  if (baseUrlObj.origin !== urlObj.origin) {
    throw new Error('URL origin does not match');
  }

  return urlObj.pathname.replace(baseUrlObj.pathname, '');
};
