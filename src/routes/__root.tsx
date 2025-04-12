import {
  createRootRoute,
  Link,
  Outlet,
  useLocation,
} from '@tanstack/react-router';
import clsx from 'clsx';

export const Route = createRootRoute({
  component: () => {
    const { pathname } = useLocation();
    const isRootActive = pathname === '/';

    return (
      <>
        <div className="sticky top-0 z-50 p-2">
          <div className="mx-auto flex max-w-[50rem] gap-2 rounded-full border-b border-b-white/40 bg-white/40 px-8 py-4 backdrop-blur-lg">
            <Link
              to="/"
              search={{ page: 1 }}
              className={clsx(
                isRootActive && '-active',
                'group grid grid-cols-[30px_0] items-center overflow-hidden transition-all duration-5000 ease-in-out [.-active]:grid-cols-[30px_1fr]',
              )}
            >
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" />
              <span className="font-bold text-slate-800 group-hover:text-slate-600">
                Pokédex
              </span>
            </Link>
          </div>
        </div>
        <main className="isolate m-auto max-w-[50rem] px-4 pb-4">
          <Outlet />
        </main>
      </>
    );
  },
});
