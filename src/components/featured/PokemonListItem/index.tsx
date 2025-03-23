import styles from './index.module.scss';
import { Image } from '@/components/common/image';
import { getPokemon } from '@/queries/pokemon';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

type PokemonListItemProps = {
  pokemonName: string;
};

export const PokemonListItem = ({ pokemonName }: PokemonListItemProps) => {
  const { data: pokemon } = useQuery({
    queryKey: ['pokemon', pokemonName],
    queryFn: () => getPokemon(pokemonName),
  });

  return (
    <li className="contents">
      <Link
        to="/pokemon/$pokemonId"
        disabled={!pokemon}
        params={{ pokemonId: pokemonName }}
        className={styles['pokemon-item']}
      >
        <span className={styles['pokemon-id']}>
          {pokemon ? pokemon?.id : '&nbsp;'}
        </span>
        <span>{pokemonName}</span>
        <Image
          width={96}
          height={96}
          src={pokemon?.sprites.front_default}
          alt={pokemon?.name}
        />
      </Link>
    </li>
  );
};
