import { useQuery } from "@tanstack/react-query";
import { getPokemonList } from "../queries/pokemon";
import { PokemonListItem } from "./PokemonListItem";
import { useState } from "react";

export const PokemonList = () => {
  const [offset, setOffset] = useState(0);

  const { isLoading, data } = useQuery({
    queryKey: ["pokemonList", offset],
    queryFn: () => getPokemonList(offset),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.results || data?.results.length === 0) {
    return null;
  }

  return (
    <>
      <div>
        <button onClick={() => setOffset((prev) => prev - 50)}>Prev</button>
        <button onClick={() => setOffset((prev) => prev + 50)}>Next</button>
      </div>
      <div>
        <ul>
          {data.results.map((pokemon) => (
            <PokemonListItem key={pokemon.name} pokemonName={pokemon.name} />
          ))}
        </ul>
      </div>
    </>
  );
};
