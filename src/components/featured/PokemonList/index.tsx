import styles from './index.module.scss';
import { PokemonListItem } from '../PokemonListItem';
import { getPokemonList } from '@/queries/pokemon';
import { useQuery } from '@tanstack/react-query';
import { memo, useState } from 'react';

export const PokemonList = () => {
  const [offset, setOffset] = useState(0);

  const { data } = useQuery({
    queryKey: ['pokemonList', offset],
    queryFn: () => getPokemonList(offset),
  });

  if (!data?.results || data?.results.length === 0) {
    return null;
  }

  return (
    <>
      <Pagination
        onClickPrev={() => setOffset(offset - 50)}
        onClickNext={() => setOffset(offset + 50)}
      />
      <div>
        <ul className={styles['pokemon-list']}>
          {data.results.map((pokemon) => (
            <PokemonListItem key={pokemon.name} pokemonName={pokemon.name} />
          ))}
        </ul>
      </div>
    </>
  );
};

type PaginationProps = {
  onClickPrev: () => void;
  onClickNext: () => void;
};

const Pagination = memo(({ onClickPrev, onClickNext }: PaginationProps) => {
  return (
    <div>
      <button onClick={onClickPrev}>Prev</button>
      <button onClick={onClickNext}>Next</button>
    </div>
  );
});
