'use client';

import { useState, useEffect } from 'react';
import { SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';
import { clsx } from 'clsx';

export function SoundToggle() {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const muted = localStorage.getItem('sound-muted') === 'true';
    setIsMuted(muted);
  }, []);

  const toggleSound = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('sound-muted', String(newMuted));
    window.dispatchEvent(new Event('sound-muted-change'));
  };

  return (
    <button
      onClick={toggleSound}
      className={clsx(
        'fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200',
        'bg-background/80 backdrop-blur-sm border-zinc-200 dark:border-zinc-800',
        'hover:scale-105 active:scale-95'
      )}
      aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
    >
      {isMuted ? (
        <SpeakerSlash size={20} weight="bold" className="text-zinc-600 dark:text-zinc-400" />
      ) : (
        <SpeakerHigh size={20} weight="bold" className="text-zinc-600 dark:text-zinc-400" />
      )}
    </button>
  );
}