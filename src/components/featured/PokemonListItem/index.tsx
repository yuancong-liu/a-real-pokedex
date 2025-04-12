import { useColor } from 'color-thief-react';

import { Image } from '@/components/common/image';
import { Link } from '@tanstack/react-router';
import clsx from 'clsx';

type PokemonListItemProps = {
  id: number;
  displayName?: string;
  imgSrc?: string;
};

export const PokemonListItem = ({
  id,
  displayName,
  imgSrc,
}: PokemonListItemProps) => {
  const { data: color } = useColor(imgSrc ?? '', 'rgbString', {
    crossOrigin: 'Anonymous',
  });

  return (
    <li
      className="pokemon-list-item flex flex-col items-center rounded-lg p-4 text-white transition-[background-color] duration-300"
      style={{ backgroundColor: color }}
    >
      <Link
        to="/pokemon/$pokemonId"
        disabled={!displayName}
        params={{ pokemonId: id.toString() }}
        className="contents"
      >
        <span>{displayName}</span>
        <div className="grid aspect-square h-full w-fit grid-cols-1 grid-rows-1 place-items-center">
          <span
            className={clsx(
              'col-span-1 col-start-1 row-span-1 row-start-1 text-6xl font-bold',
              `${id}`.length <= 2 && 'text-8xl',
              `${id}`.length === 3 && 'text-7xl',
              `${id}`.length === 4 && 'text-6xl',
            )}
          >
            {id}
          </span>
          <Image
            className="col-span-1 col-start-1 row-span-1 row-start-1"
            width={96}
            height={96}
            src={imgSrc}
            alt={displayName}
          />
        </div>
      </Link>
    </li>
  );
};
