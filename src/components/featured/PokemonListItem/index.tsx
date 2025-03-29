import styles from './index.module.scss';

import { Image } from '@/components/common/image';
import { getPokemonSpecies, getTargetResponse } from '@/queries/pokemon';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { PokeAPI } from 'pokeapi-types';

type PokemonListItemProps = {
  pokemonName: string;
};

export const PokemonListItem = ({ pokemonName }: PokemonListItemProps) => {
  const { data: pokemon } = useQuery({
    queryKey: ['pokemon', pokemonName],
    queryFn: () =>
      getPokemonSpecies(pokemonName).then(async (speciesData) => {
        const defaultVarietyUrl = speciesData.varieties.find(
          (variety) => variety.is_default,
        )?.pokemon.url;

        if (!defaultVarietyUrl) {
          return { ...speciesData, imgSrc: '' };
        }

        const imgSrc = await getTargetResponse<PokeAPI.Pokemon>({
          path: defaultVarietyUrl,
        }).then((pokemonData) => pokemonData.sprites.front_default);
        return { ...speciesData, imgSrc };
      }),
  });

  return (
    <li className="contents">
      <Link
        to="/pokemon/$pokemonId"
        disabled={!pokemon}
        params={{ pokemonId: pokemonName }}
        className={styles['pokemon-item']}
      >
        <span className={styles['pokemon-id']}>
          {pokemon ? pokemon?.id : `&nbsp;`}
        </span>
        <span>{pokemonName}</span>
        <Image
          width={96}
          height={96}
          src={pokemon?.imgSrc}
          alt={pokemon?.name}
        />
      </Link>
    </li>
  );
};
