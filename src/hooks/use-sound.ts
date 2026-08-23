import { useCallback, useEffect, useRef } from "react";
import {
  decodeAudioData,
  playSound,
  type SoundPlayback,
} from "@/lib/sound-engine";
import type {
  SoundAsset,
  UseSoundOptions,
  UseSoundReturn,
} from "@/lib/sound-types";

export function useSound(
  sound: SoundAsset,
  options: UseSoundOptions = {},
): UseSoundReturn {
  const playbackRef = useRef<SoundPlayback | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    void decodeAudioData(sound.dataUri);
  }, [sound.dataUri]);

  const play = useCallback(
    (overrides?: { volume?: number; playbackRate?: number }) => {
      const current = optionsRef.current;
      if (current.soundEnabled === false) {
        return;
      }
      if (current.interrupt) {
        playbackRef.current?.stop();
      }
      void playSound(sound.dataUri, {
        volume: overrides?.volume ?? current.volume,
        playbackRate: overrides?.playbackRate ?? current.playbackRate,
        onEnd: current.onEnd,
      }).then((playback) => {
        playbackRef.current = playback;
        current.onPlay?.();
      });
    },
    [sound.dataUri],
  );

  const stop = useCallback(() => {
    playbackRef.current?.stop();
    optionsRef.current.onStop?.();
  }, []);

  const pause = useCallback(() => {
    playbackRef.current?.stop();
    optionsRef.current.onPause?.();
  }, []);

  return [
    play,
    {
      stop,
      pause,
      isPlaying: false,
      duration: sound.duration,
      sound,
    },
  ];
}
