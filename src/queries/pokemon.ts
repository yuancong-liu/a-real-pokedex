import { axiosInstance } from "../utils/axios";
import type { PokeAPI } from "pokeapi-types";

export const getPokemon = async (id: number) => {
  return await axiosInstance
    .get<PokeAPI.Pokemon>(`/pokemon/${id}`)
    .then((res) => res.data);
};

export const getPokemonList = async (offset: number) => {
  return await axiosInstance
    .get<{
      results: { name: string; url: string }[];
    }>(`/pokemon`, {
      params: {
        limit: 50,
        offset,
      },
    })
    .then((res) => res.data);
};
