import { Image } from '@/components/common/image';
import {
  getPokemon,
  getPokemonEvolutionChain,
  getPokemonSpecies,
} from '@/queries/pokemon';
import { useQuery } from '@tanstack/react-query';
import { Link, createFileRoute, getRouteApi } from '@tanstack/react-router';
import { PokeAPI } from 'pokeapi-types';

const route = getRouteApi('/pokemon/$pokemonId');

const PokemonDetail = () => {
  const { name, id, sprites, species } = route.useLoaderData();
  const { data: evoChain } = useQuery({
    queryKey: ['evolutionChain', species.name],
    queryFn: () =>
      getPokemonSpecies(species.name).then((speciesData) => {
        const evoChainId = speciesData.evolution_chain.url.split('/').at(-2);
        return getPokemonEvolutionChain(evoChainId);
      }),
  });

  // const { data: evoChain } = useQuery({
  //   queryKey: ['evolutionChain', speciesData?.id],
  //   queryFn: () => getPokemonEvolutionChain(speciesData?.id),
  // });

  return (
    <div>
      <section>
        {name}
        {id}
        <Image width={96} height={96} src={sprites.front_default} alt={name} />
      </section>
      {evoChain && (
        <section>
          <h2>Evolution Chain</h2>
          <ul>
            {evoChain.chain.evolves_to.map((evolution) => (
              <Link
                to="/pokemon/$pokemonId"
                params={{ pokemonId: evolution.species.name }}
                key={evolution.species.name}
              >
                {evolution.species.name}
              </Link>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export const Route = createFileRoute('/pokemon/$pokemonId')({
  component: PokemonDetail,
  loader: async ({ params }): Promise<PokeAPI.Pokemon> => {
    const { pokemonId } = params;
    return getPokemon(pokemonId);
  },
});
