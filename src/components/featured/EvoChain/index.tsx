import { getTargetResponse } from '@/queries/pokemon';
import { useQuery } from '@tanstack/react-query';
import { PokeAPI } from 'pokeapi-types';
import { Image } from '@/components/common/image';
import { Link } from '@tanstack/react-router';

type EvoChainProps = {
  evoChain: PokeAPI.ChainLink;
};

export const EvoChain = ({ evoChain }: EvoChainProps) => {
  const { data: imgSrc } = useQuery({
    queryKey: ['species', evoChain.species.url],
    queryFn: () =>
      getTargetResponse<PokeAPI.PokemonSpecies>({
        path: evoChain.species.url,
      }).then(async (speciesData) => {
        const defaultVarietyUrl = speciesData.varieties.find(
          (variety) => variety.is_default,
        )?.pokemon.url;
        if (!defaultVarietyUrl) {
          return '';
        }
        return await getTargetResponse<PokeAPI.Pokemon>({
          path: defaultVarietyUrl,
        }).then((pokemonData) => pokemonData.sprites.front_default);
      }),
  });

  return (
    <div className="flex items-center gap-2">
      <Link
        to="/pokemon/$pokemonId"
        params={{ pokemonId: evoChain.species.name }}
        className="flex flex-col items-center"
      >
        <Image
          width={96}
          height={96}
          src={imgSrc}
          alt={evoChain.species.name}
        />
        <span>{evoChain.species.name}</span>
      </Link>
      {evoChain.evolves_to.length > 0 && (
        <div className="flex flex-col gap-2">
          {evoChain.evolves_to.map((evo) => (
            <EvoChain key={evo.species.name} evoChain={evo} />
          ))}
        </div>
      )}
    </div>
  );
};
