import { Image } from '@/components/common/image';
import { getPokemonSpecies, getTargetResponse } from '@/queries/pokemon';
import { getPokemonName } from '@/utils/getPokemonName';
import { Combobox, ComboboxInput, ComboboxOptions } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { Loader2Icon } from 'lucide-react';
import { PokeAPI } from 'pokeapi-types';
import { useState } from 'react';

export const PokemonQuickAccess = () => {
  const [query, setQuery] = useState('');

  const { data, isError, isLoading } = useQuery({
    queryKey: ['pokemon', query],
    queryFn: () =>
      getPokemonSpecies(query).then((res) => {
        const engName = getPokemonName(res.names);
        const target = res.varieties.find((v) => v.is_default)?.pokemon.url;

        if (!target) {
          return { imgSrc: '', name: engName, id: res.id };
        }

        const imgSrc = getTargetResponse<PokeAPI.Pokemon>({
          path: target,
        }).then((pokemon) => ({
          imgSrc: pokemon.sprites.front_default,
        }));

        return imgSrc.then((img) => ({
          imgSrc: img.imgSrc,
          name: engName,
          id: res.id,
        }));
      }),
    enabled: !!query,
    retry: (_, error: AxiosError) => error.status !== 404,
  });

  return (
    <Combobox onClose={() => setQuery('')}>
      <ComboboxInput
        onChange={(e) => setQuery(e.target.value)}
        className="mx-auto w-full max-w-xl rounded-full border border-slate-300 px-4 py-2 focus:outline-0"
        placeholder="Pokémon ID or Name"
      />
      {!!query && (
        <ComboboxOptions
          anchor="bottom"
          className="w-[var(--input-width)] rounded-3xl border border-slate-300 bg-white p-2 shadow-2xl [--anchor-gap:var(--spacing-2)] empty:hidden"
        >
          {data && (
            <Link
              to="/pokemon/$pokemonId"
              params={{ pokemonId: data.name ?? '' }}
              className="flex items-center gap-4"
            >
              <div className="grid size-18 place-items-center rounded-full bg-slate-200">
                <Image
                  src={data.imgSrc}
                  alt={data.name}
                  className="size-14 rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">{data.name}</span>
                <span className="text-slate-400">
                  #{data.id.toString().padStart(3, '0')}
                </span>
              </div>
            </Link>
          )}
          {isError && <div className="text-red-400">Pokémon not found</div>}
          {isLoading && (
            <div className="grid w-full place-items-center">
              <Loader2Icon className="animate-spin text-slate-400" size={24} />
            </div>
          )}
        </ComboboxOptions>
      )}
    </Combobox>
  );
};
