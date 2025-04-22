import { createFileRoute, notFound, useRouter } from '@tanstack/react-router';
import { PokemonList } from '@/components/featured/PokemonList';
import { getPokemonList } from '@/queries/pokemon';
import { ITEM_COUNT_PER_PAGE } from '@/utils/consts';
import { PokemonQuickAccess } from '@/components/featured/PokemonQuickAccess';
import { Button } from '@headlessui/react';
import { ArrowLeftIcon } from 'lucide-react';

type ListSearchParams = {
  page: number;
};

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex grow flex-col">
      <section className="relative grid h-full grow flex-col place-items-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold text-slate-900">
            You've Gone too Far!
          </h1>
          <Button
            className="group flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-white underline-offset-4 transition-colors hover:bg-cyan-400 hover:underline"
            onClick={() =>
              router.navigate({
                to: '/',
                search: { page: 1 },
              })
            }
          >
            <ArrowLeftIcon
              size={16}
              className="text-white transition-all group-data-hover:animate-ping"
            />
            <span>BACK TO THE LIST</span>
          </Button>
        </div>
      </section>
    </div>
  );
};

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): ListSearchParams => ({
    page: +(search?.page ? (+search.page > 0 ? search.page : 1) : 1),
  }),
  component: () => (
    <>
      <div className="flex justify-center pb-2">
        <PokemonQuickAccess />
      </div>
      <PokemonList />
    </>
  ),
  notFoundComponent: NotFound,
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: async ({ deps: { page } }) =>
    await getPokemonList((page - 1) * ITEM_COUNT_PER_PAGE).then((res) => {
      if (res.results.length === 0) {
        throw notFound();
      }
      return res;
    }),
});
