import { Image } from '@/components/common/image';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { EvoChain } from '@/components/featured/EvoChain';
import { getPokemonSpecies, getTargetResponse } from '@/queries/pokemon';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { PokeAPI } from 'pokeapi-types';
import { Forms } from '@/components/featured/forms/forms';

const route = getRouteApi('/pokemon/$pokemonId');

const PokemonDetail = () => {
  const { name, id, evolution_chain, varieties } = route.useLoaderData();

  const { data: evoChain } = useQuery({
    queryKey: ['evolutionChain', evolution_chain.url],
    queryFn: () =>
      getTargetResponse<PokeAPI.EvolutionChain>({
        path: evolution_chain.url,
      }),
  });

  const { data: pokemons } = useQuery({
    queryKey: ['pokemonVarieties', name],
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

  return (
    <div>
      <section>
        #{id}
        {name}
        {pokemons && (
          <TabGroup className="flex flex-col gap-2 overflow-scroll">
            <TabList className="flex gap-2">
              {pokemons.map((p) => (
                <Tab>{p.name}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {pokemons.map((p) => (
                <TabPanel key={p.name} className="flex flex-col items-center">
                  <Image
                    src={p.sprites.front_default}
                    alt={p.name}
                    width={96}
                    height={96}
                  />
                  <div className="flex w-full gap-2 overflow-scroll">
                    {p.forms.map((form) => (
                      <Forms key={form.url} formUrl={form.url} />
                    ))}
                  </div>
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
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
