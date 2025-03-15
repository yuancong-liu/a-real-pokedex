import { createFileRoute } from "@tanstack/react-router";
import { PokemonList } from "@/components/PokemonList";

const Index = () => {
  return (
    <div className="p-2">
      <PokemonList />
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
