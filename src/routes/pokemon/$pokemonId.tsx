import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Select } from '@headlessui/react';
import { EvoChain } from '@/components/featured/EvoChain';
import { getPokemonSpecies, getTargetResponse } from '@/queries/pokemon';
import { useQuery } from '@tanstack/react-query';
import {
  createFileRoute,
  getRouteApi,
  notFound,
  useRouter,
} from '@tanstack/react-router';
import { PokeAPI } from 'pokeapi-types';
import { Forms } from '@/components/featured/forms/forms';
import { Image } from '@/components/common/image';
import { getPokemonName, getPokemonNameArray } from '@/utils/getPokemonName';
import { PokemonTypeIcon } from '@/components/featured/PokemonTypeIcon';
import { PokemonType } from '@/types/pokemonType';
import { PokemonId } from '@/components/featured/PokemonId';
import clsx from 'clsx';
import { ArrowLeftIcon, ChevronDownIcon } from 'lucide-react';

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
    <div className="flex flex-col gap-4">
      <section className="relative flex flex-col">
        <div className="absolute top-0 -left-10 -z-10">
          <PokemonId id={id} />
        </div>
        <h1 className="text-4xl font-bold text-slate-900">
          {getPokemonName(names)}
        </h1>
        <span className="text-sm">{getPokemonNameArray(names).join('/')}</span>
      </section>

      <section className="flex flex-col gap-2">
        {varieties.length > 1 && (
          <div className="relative">
            <Select
              className={clsx(
                'block w-full appearance-none p-2',
                'border-b border-slate-200',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-white/25',
              )}
              value={currentPokemon}
              onChange={handleSelectChange}
              disabled={varieties.length <= 1}
            >
              {varieties.map((v) => (
                <option value={v.pokemon.name} key={v.pokemon.name}>
                  {v.pokemon.name}
                </option>
              ))}
            </Select>
            <ChevronDownIcon
              className="pointer-events-none absolute top-3.5 right-2.5 size-4 fill-white/60"
              size={16}
              aria-hidden="true"
            />
          </div>
        )}

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
          <h2 className="text-2xl font-semibold text-slate-600">Evo Chain</h2>
          <div className="grid place-items-center overflow-auto pb-4">
            <EvoChain evoChain={evoChain.chain} currentPokemonId={id} />
          </div>
        </section>
      )}
    </div>
  );
};

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex grow flex-col">
      <section className="relative grid h-full grow flex-col place-items-center">
        <div className="absolute top-0 -left-10 -z-10">
          <PokemonId />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold text-slate-900">
            No Such Pokémon!
          </h1>
          <Button
            className="group flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-white underline-offset-4 transition-colors hover:bg-cyan-400 hover:underline"
            onClick={() =>
              router.navigate({
                to: '/',
                search: { page: 1 },
              })
            }
          >
            <ArrowLeftIcon
              size={16}
              className="text-white transition-all group-data-hover:animate-ping"
            />
            <span>BACK TO THE LIST</span>
          </Button>
        </div>
      </section>
    </div>
  );
};

export const Route = createFileRoute('/pokemon/$pokemonId')({
  component: PokemonDetail,
  notFoundComponent: NotFound,
  loader: async ({ params }): Promise<PokeAPI.PokemonSpecies> => {
    const { pokemonId } = params;
    return await getPokemonSpecies(pokemonId)
      .then((res) => res)
      .catch((err) => {
        if (err.response?.status === 404) {
          throw notFound();
        }
        throw err;
      });
  },
});
