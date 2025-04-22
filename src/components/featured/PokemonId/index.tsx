import { animate, createScope, createTimer, Scope, utils } from 'animejs';
import { useEffect, useRef } from 'react';

type PokemonIdProps = {
  id?: number;
};

export const PokemonId = ({ id }: PokemonIdProps) => {
  const idRef = useRef(null);
  const animeScope = useRef<Scope | null>(null);

  useEffect(() => {
    if (!idRef.current) return;

    animeScope.current = createScope({ root: idRef }).add(() => {
      const [idString] = utils.$('.pokemon-id');
      const [idWrapper] = utils.$('.pokemon-id-wrapper');

      createTimer({
        duration: id,
        loop: !id,
        frameRate: 90,
        playbackRate: id ? id / 1000 : 1,
        onUpdate: (t) => (idString.innerHTML = `${Math.floor(t.currentTime)}`),
      });

      if (!id)
        animate(idWrapper, {
          opacity: [{ to: [1, 0], duration: 10_000 }],
        });
    });

    return () => animeScope.current?.revert();
  }, [id]);

  return (
    <div ref={idRef} className="text-8xl font-semibold text-slate-300">
      <span className="pokemon-id-wrapper">
        #<span className="pokemon-id">{id}</span>
      </span>
    </div>
  );
};
