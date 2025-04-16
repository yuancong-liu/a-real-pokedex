import { getTargetResponse } from '@/queries/pokemon';
import { useQuery } from '@tanstack/react-query';
import { PokeAPI } from 'pokeapi-types';
import { Image } from '@/components/common/image';
import { Link } from '@tanstack/react-router';
import { ArrowRightIcon } from 'lucide-react';
import clsx from 'clsx';

type EvoChainProps = {
  evoChain: PokeAPI.ChainLink;
  shouldShowArrow?: boolean;
  currentPokemonId?: number;
};

export const EvoChain = ({
  evoChain,
  shouldShowArrow,
  currentPokemonId,
}: EvoChainProps) => {
  const { data } = useQuery({
    queryKey: ['species', evoChain.species.url],
    queryFn: () =>
      getTargetResponse<PokeAPI.PokemonSpecies>({
        path: evoChain.species.url,
      }).then(async (speciesData) => {
        const defaultVarietyUrl = speciesData.varieties.find(
          (variety) => variety.is_default,
        )?.pokemon.url;
        if (!defaultVarietyUrl) {
          return { imgSrc: '', id: speciesData.id };
        }
        return await getTargetResponse<PokeAPI.Pokemon>({
          path: defaultVarietyUrl,
        }).then((pokemonData) => ({
          imgSrc: pokemonData.sprites.front_default,
          id: speciesData.id,
        }));
      }),
  });

  return (
    <div className="flex items-center gap-4">
      {shouldShowArrow && (
        <ArrowRightIcon size={24} className="text-slate-400" />
      )}
      <Link
        to="/pokemon/$pokemonId"
        params={{ pokemonId: evoChain.species.name }}
        className="flex flex-col items-center"
      >
        <Image
          width={96}
          height={96}
          src={data?.imgSrc}
          alt={evoChain.species.name}
        />
        <span
          className={clsx(
            currentPokemonId === data?.id &&
              'font-bold underline underline-offset-4',
          )}
        >
          {evoChain.species.name}
        </span>
      </Link>
      {evoChain.evolves_to.length > 0 && (
        <div className="flex flex-col gap-2">
          {evoChain.evolves_to.map((evo) => (
            <EvoChain
              key={evo.species.name}
              evoChain={evo}
              shouldShowArrow
              currentPokemonId={currentPokemonId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
