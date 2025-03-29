import { axiosInstance } from '@/utils/axios';
import type { AxiosRequestConfig } from 'axios';
import type { PokeAPI } from 'pokeapi-types';

type TargetResponseOptions = {
  path: string;
  params?: AxiosRequestConfig['params'];
};

export const getTargetResponse = async <T>({
  path,
  params,
}: TargetResponseOptions) => {
  return await axiosInstance.get<T>(path, { params }).then((res) => res.data);
};

export const getPokemon = (name: string) =>
  getTargetResponse<PokeAPI.Pokemon>({ path: `/pokemon/${name}` });

export const getPokemonList = (offset: number) =>
  getTargetResponse<{ results: { name: string; url: string }[] }>({
    path: `/pokemon-species`,
    params: {
      limit: 50,
      offset,
    },
  });

export const getPokemonSpecies = async (name: string) => {
  return await axiosInstance
    .get<PokeAPI.PokemonSpecies>(`/pokemon-species/${name}`)
    .then((res) => res.data);
};

export const getPokemonEvolutionChain = async (id: number) => {
  return await axiosInstance
    .get<PokeAPI.EvolutionChain>(`/evolution-chain/${id}`)
    .then((res) => res.data);
};
