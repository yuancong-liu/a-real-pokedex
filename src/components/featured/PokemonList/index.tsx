import styles from './index.module.scss';
import { PokemonListItem } from '../PokemonListItem';

import { Link, getRouteApi } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getPokemonSpecies, getTargetResponse } from '@/queries/pokemon';
import { PokeAPI } from 'pokeapi-types';
import { useEffect, useRef } from 'react';
import { animate, createScope, createSpring, Scope, stagger } from 'animejs';
import { ChevronRightIcon, ChevronLeftIcon, Loader2Icon } from 'lucide-react';

const route = getRouteApi('/');

export const PokemonList = () => {
  const { results } = route.useLoaderData();

  const { data: pokemons, isLoading } = useQuery({
    queryKey: ['pokemonVarieties', results],
    queryFn: () => {
      const promises = results.map(
        async (result) =>
          await getPokemonSpecies(result.name).then(async (speciesData) => {
            const defaultVarietyUrl = speciesData.varieties.find(
              (variety) => variety.is_default,
            )?.pokemon.url;

            const displayName = speciesData?.names.find(
              (name) => name.language.name === 'en',
            )?.name;

            if (!defaultVarietyUrl) {
              return {
                id: speciesData.id,
                displayName,
                imgSrc: '',
              };
            }

            const imgSrc = await getTargetResponse<PokeAPI.Pokemon>({
              path: defaultVarietyUrl,
            }).then((pokemonData) => pokemonData.sprites.front_default);

            return { id: speciesData.id, displayName, imgSrc };
          }),
      );
      return Promise.all(promises);
    },
  });

  const listRef = useRef(null);
  const animeScope = useRef<Scope | null>(null);

  useEffect(() => {
    if (!listRef.current || pokemons?.length === 0) return;

    animeScope.current = createScope({ root: listRef }).add(() => {
      animate('.pokemon-list-item', {
        y: [{ to: [200, 0], ease: createSpring({ stiffness: 100 }) }],
        scale: [{ to: [0, 1], ease: createSpring({ stiffness: 50 }) }],
        opacity: [{ to: [0, 1], duration: 100 }],
        // add basic delay to allow the rendering
        delay: stagger(50, { start: 400 }),
      });
    });

    return () => animeScope.current?.revert();
  }, [pokemons]);

  return (
    <>
      <Pagination />
      {isLoading && (
        <div className="grid h-screen w-full place-items-center">
          <Loader2Icon className="animate-spin" size={32} />
        </div>
      )}
      <div>
        <ul className={styles['pokemon-list']} ref={listRef}>
          {pokemons?.map((pokemon) => (
            <PokemonListItem
              key={pokemon.displayName}
              id={pokemon.id}
              displayName={pokemon.displayName}
              imgSrc={pokemon.imgSrc}
            />
          ))}
        </ul>
      </div>
      <Pagination />
    </>
  );
};

const Pagination = () => {
  const { previous, next } = route.useLoaderData();
  const { page } = route.useSearch();

  return (
    <div className="flex justify-between py-2">
      <Link
        to="."
        search={{ page: page - 1 }}
        disabled={!previous}
        data-disabled={!previous}
        className="group grid size-10 place-items-center rounded-full bg-slate-100"
      >
        <ChevronLeftIcon
          size={24}
          className="stroke-slate-800 group-data-[disabled=true]:stroke-slate-400"
        />
      </Link>
      <Link
        to="."
        search={{ page: page + 1 }}
        disabled={!next}
        data-disabled={!next}
        className="group grid size-10 place-items-center rounded-full bg-slate-100"
      >
        <ChevronRightIcon
          size={24}
          className="stroke-slate-800 group-data-[disabled=true]:stroke-slate-400"
        />
      </Link>
    </div>
  );
};
