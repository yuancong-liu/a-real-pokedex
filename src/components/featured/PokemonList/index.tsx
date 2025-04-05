import styles from './index.module.scss';
import { PokemonListItem } from '../PokemonListItem';

import { Link, getRouteApi } from '@tanstack/react-router';

const route = getRouteApi('/');

export const PokemonList = () => {
  const { results, previous, next } = route.useLoaderData();
  const { page } = route.useSearch();

  return (
    <>
      <div className="flex justify-between">
        <Link to="." search={{ page: page - 1 }} disabled={!previous}>
          Prev Page
        </Link>
        <Link to="." search={{ page: page + 1 }} disabled={!next}>
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
