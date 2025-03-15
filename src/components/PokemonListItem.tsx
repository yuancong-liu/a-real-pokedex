import { getPokemon } from "@/queries/pokemon";
import { useQuery } from "@tanstack/react-query";

type PokemonListItemProps = {
  pokemonName: string;
};

export const PokemonListItem = ({ pokemonName }: PokemonListItemProps) => {
  const { isLoading, data: pokemon } = useQuery({
    queryKey: ["pokemon", pokemonName],
    queryFn: () => getPokemon(pokemonName),
  });

  return (
    <li>
      {pokemonName}
      {!isLoading && (
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      )}
    </li>
  );
};
