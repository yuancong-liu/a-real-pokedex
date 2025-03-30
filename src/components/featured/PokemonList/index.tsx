import styles from './index.module.scss';
import { PokemonListItem } from '../PokemonListItem';

import { Link, getRouteApi } from '@tanstack/react-router';

const route = getRouteApi('/');

export const PokemonList = () => {
  const { results } = route.useLoaderData();

  return (
    <>
      <div className="flex justify-between">
        <Link to="." search={(prev) => ({ page: (prev.page ?? 1) - 1 })}>
          Prev Page
        </Link>
        <Link to="." search={(prev) => ({ page: (prev.page ?? 1) + 1 })}>
          Next Page
        </Link>
      </div>
      {results && (
        <div>
          <ul className={styles['pokemon-list']}>
            {results.map((pokemon) => (
              <PokemonListItem key={pokemon.name} pokemonName={pokemon.name} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
