import styles from './index.module.scss';
import { useColor } from 'color-thief-react';

import { Image } from '@/components/common/image';
import { getPokemonSpecies, getTargetResponse } from '@/queries/pokemon';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { PokeAPI } from 'pokeapi-types';
import clsx from 'clsx';

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

  const displayName = pokemon?.names.find(
    (name) => name.language.name === 'en',
  )?.name;

  const { data: color } = useColor(pokemon?.imgSrc!, 'rgbString', {
    crossOrigin: 'Anonymous',
  });

  return (
    <li className="contents">
      <Link
        to="/pokemon/$pokemonId"
        disabled={!pokemon}
        params={{ pokemonId: pokemonName }}
        className="flex flex-col items-center rounded-lg p-4 text-white"
        style={{ backgroundColor: color }}
      >
        <span>{displayName}</span>
        <div className="grid aspect-square w-fit grid-cols-1 grid-rows-1 place-items-center">
          <span
            className={clsx(
              'col-span-1 col-start-1 row-span-1 row-start-1 text-6xl font-bold',
              `${pokemon?.id}`.length <= 2 && 'text-8xl',
              `${pokemon?.id}`.length === 3 && 'text-7xl',
              `${pokemon?.id}`.length === 4 && 'text-6xl',
            )}
          >
            {pokemon?.id}
          </span>
          <Image
            className="col-span-1 col-start-1 row-span-1 row-start-1"
            width={96}
            height={96}
            src={pokemon?.imgSrc}
            alt={pokemon?.name}
          />
        </div>
      </Link>
    </li>
  );
};
