import { ChangeEvent, useEffect, useState } from 'react';
import { Select } from '@headlessui/react';
import { EvoChain } from '@/components/featured/EvoChain';
import { getPokemonSpecies, getTargetResponse } from '@/queries/pokemon';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { PokeAPI } from 'pokeapi-types';
import { Forms } from '@/components/featured/forms/forms';
import { Image } from '@/components/common/image';
import { getPokemonNameArray } from '@/utils/getPokemonNameArray';
import { PokemonTypeIcon } from '@/components/featured/PokemonTypeIcon';
import { PokemonType } from '@/types/pokemonType';

const route = getRouteApi('/pokemon/$pokemonId');

const PokemonDetail = () => {
  const { names, id, evolution_chain, varieties } = route.useLoaderData();
  const [currentPokemon, setCurrentPokemon] = useState(
    varieties.find((v) => v.is_default)?.pokemon.name,
  );

  useEffect(() => {
    const defaultPokemonName = varieties.find((v) => v.is_default)?.pokemon
      .name;
    setCurrentPokemon(defaultPokemonName);
  }, [varieties]);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentPokemon(e.target.value);
  };

  const { data: evoChain } = useQuery({
    queryKey: ['evolutionChain', evolution_chain.url],
    queryFn: () =>
      getTargetResponse<PokeAPI.EvolutionChain>({
        path: evolution_chain.url,
      }),
  });

  const { data: pokemons } = useQuery({
    queryKey: ['pokemonVarieties', varieties],
    queryFn: () => {
      const promises = varieties.map(
        async (variety) =>
          await getTargetResponse<PokeAPI.Pokemon>({
            path: variety.pokemon.url,
          }),
      );
      return Promise.all(promises);
    },
  });

  const currentPokemonData = pokemons?.find((p) => p.name === currentPokemon);

  return (
    <div>
      <section className="relative flex flex-col">
        <span className="absolute -top-10 -left-10 -z-10 text-8xl font-semibold text-slate-300">
          #{id}
        </span>
        <span>{getPokemonNameArray(names).join('/')}</span>
        <Select
          value={currentPokemon}
          onChange={handleSelectChange}
          disabled={varieties.length === 1}
        >
          {varieties.map((v) => (
            <option value={v.pokemon.name} key={v.pokemon.name}>
              {v.pokemon.name}
            </option>
          ))}
        </Select>

        {currentPokemonData && (
          <>
            <div className="flex justify-center gap-2">
              <Image
                src={currentPokemonData.sprites.front_default}
                alt={currentPokemonData.name}
                width={96}
                height={96}
              />
              {currentPokemonData.sprites.front_shiny && (
                <Image
                  src={currentPokemonData.sprites.front_shiny}
                  alt={currentPokemonData.name}
                  width={96}
                  height={96}
                />
              )}
            </div>
            <div className="flex justify-center gap-2">
              {currentPokemonData.types.map((type) => (
                <PokemonTypeIcon
                  type={type.type.name as PokemonType}
                  key={type.type.name}
                />
              ))}
            </div>
            <div className="flex w-full gap-2 overflow-scroll">
              {currentPokemonData.forms.length > 1 &&
                currentPokemonData.forms.map((form) => (
                  <Forms key={form.url} formUrl={form.url} />
                ))}
            </div>
          </>
        )}
      </section>
      {!!evoChain?.chain.evolves_to.length && (
        <section>
          <h2>Evolution Chain</h2>
          <EvoChain evoChain={evoChain.chain} />
        </section>
      )}
    </div>
  );
};

export const Route = createFileRoute('/pokemon/$pokemonId')({
  component: PokemonDetail,
  loader: async ({ params }): Promise<PokeAPI.PokemonSpecies> => {
    const { pokemonId } = params;
    return getPokemonSpecies(pokemonId);
  },
});
