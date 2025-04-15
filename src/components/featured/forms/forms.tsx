import { Image } from '@/components/common/image';
import { getTargetResponse } from '@/queries/pokemon';
import { getPokemonFormName } from '@/utils/getPokemonName';
import { useQuery } from '@tanstack/react-query';
import { PokeAPI } from 'pokeapi-types';

type FormsProps = {
  formUrl: string;
};

export const Forms = ({ formUrl }: FormsProps) => {
  const { data } = useQuery({
    queryKey: ['form', formUrl],
    queryFn: () =>
      getTargetResponse<PokeAPI.PokemonForm>({
        path: formUrl,
      }),
  });

  return (
    <div className="flex flex-col justify-between">
      <span>{getPokemonFormName(data?.names)}</span>
      <Image
        width={96}
        height={96}
        src={data?.sprites.front_default}
        alt={data?.name}
      />
    </div>
  );
};
