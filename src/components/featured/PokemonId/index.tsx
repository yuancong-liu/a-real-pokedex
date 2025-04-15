import { createScope, createTimer, Scope, utils } from 'animejs';
import { useEffect, useRef } from 'react';

type PokemonIdProps = {
  id: number;
};

export const PokemonId = ({ id }: PokemonIdProps) => {
  const idRef = useRef(null);
  const animeScope = useRef<Scope | null>(null);

  useEffect(() => {
    if (!idRef.current) return;

    animeScope.current = createScope({ root: idRef }).add(() => {
      const [idString] = utils.$('.pokemon-id');

      createTimer({
        duration: id,
        frameRate: 90,
        playbackRate: id / 1000,
        onUpdate: (t) => (idString.innerHTML = `${Math.floor(t.currentTime)}`),
      });
    });

    return () => animeScope.current?.revert();
  }, [id]);

  return (
    <div ref={idRef} className="text-8xl font-semibold text-slate-300">
      #<span className="pokemon-id">{id}</span>
    </div>
  );
};
