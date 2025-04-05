import Bug from '@/assets/icons/types/bug.svg?react';
import Dark from '@/assets/icons/types/dark.svg?react';
import Dragon from '@/assets/icons/types/dragon.svg?react';
import Electric from '@/assets/icons/types/electric.svg?react';
import Fairy from '@/assets/icons/types/fairy.svg?react';
import Fighting from '@/assets/icons/types/fighting.svg?react';
import Fire from '@/assets/icons/types/fire.svg?react';
import Flying from '@/assets/icons/types/flying.svg?react';
import Ghost from '@/assets/icons/types/ghost.svg?react';
import Grass from '@/assets/icons/types/grass.svg?react';
import Ground from '@/assets/icons/types/ground.svg?react';
import Ice from '@/assets/icons/types/ice.svg?react';
import Normal from '@/assets/icons/types/normal.svg?react';
import Poison from '@/assets/icons/types/poison.svg?react';
import Psychic from '@/assets/icons/types/psychic.svg?react';
import Rock from '@/assets/icons/types/rock.svg?react';
import Steel from '@/assets/icons/types/steel.svg?react';
import Water from '@/assets/icons/types/water.svg?react';
import { PokemonType } from '@/types/pokemonType';
import { ReactNode } from '@tanstack/react-router';

const typeIconMap: Record<PokemonType, ReactNode> = {
  bug: <Bug />,
  dark: <Dark />,
  dragon: <Dragon />,
  electric: <Electric />,
  fairy: <Fairy />,
  fighting: <Fighting />,
  fire: <Fire />,
  flying: <Flying />,
  ghost: <Ghost />,
  grass: <Grass />,
  ground: <Ground />,
  ice: <Ice />,
  normal: <Normal />,
  poison: <Poison />,
  psychic: <Psychic />,
  rock: <Rock />,
  steel: <Steel />,
  water: <Water />,
};

type PokemonTypeIconProps = {
  type: PokemonType;
};

export const PokemonTypeIcon = ({ type }: PokemonTypeIconProps) =>
  typeIconMap[type];
