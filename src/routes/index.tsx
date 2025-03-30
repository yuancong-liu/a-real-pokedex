import { createFileRoute } from '@tanstack/react-router';
import { PokemonList } from '@/components/featured/PokemonList';
import { getPokemonList } from '@/queries/pokemon';
import { ITEM_COUNT_PER_PAGE } from '@/utils/consts';

const Index = () => {
  return (
    <div className="p-2">
      <PokemonList />
    </div>
  );
};

type ListSearchParams = {
  page: number;
};

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): ListSearchParams => ({
    page: Number(search?.page ?? 1),
  }),
  component: Index,
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: async ({ deps: { page } }) =>
    await getPokemonList((page - 1) * ITEM_COUNT_PER_PAGE),
});
