import { Link, useLocation } from '@tanstack/react-router';
import clsx from 'clsx';

export const Header = () => {
  const { pathname } = useLocation();
  const isRootActive = pathname === '/';

  return (
    <div className="sticky top-0 z-50 p-2">
      <div className="mx-auto flex max-w-[50rem] gap-2 rounded-full border-b border-b-white/40 bg-white/40 px-8 py-4 backdrop-blur-lg">
        <Link
          to="/"
          search={{ page: 1 }}
          className={clsx(
            'grid grid-cols-[auto_0fr] items-center justify-start transition-all [.-active]:grid-cols-[auto_1fr]',
            isRootActive && '-active',
          )}
        >
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" />
          <span className="grid overflow-hidden font-bold text-slate-800 group-hover:text-slate-600">
            Pokédex
          </span>
        </Link>
      </div>
    </div>
  );
};
