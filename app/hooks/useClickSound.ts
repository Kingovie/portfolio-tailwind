'use client';

import { useEffect, useRef, useCallback } from 'react';

function playClickSound(ctx: AudioContext) {
  if (ctx.state === 'suspended') ctx.resume();

  const when = ctx.currentTime + 0.01;
  const duration = 0.008;
  const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 40);
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 3200;
  filter.Q.value = 3;

  const gain = ctx.createGain();
  gain.gain.value = 0.3;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  source.onended = () => source.disconnect();
  source.start(when);

  if (navigator.vibrate) navigator.vibrate(8);
}

function bloomTone(ctx: AudioContext, freq: number, attack: number, decay: number, peak: number, detune: number, offset: number) {
  const t = ctx.currentTime + offset;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  if (detune) osc.detune.value = detune;
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(peak, t + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + attack + decay + 0.01);
}

export function playBloomSound(ctx: AudioContext) {
  if (ctx.state === 'suspended') ctx.resume();
  bloomTone(ctx, 528, 0.06, 0.32, 0.15, 0, 0);
  bloomTone(ctx, 528, 0.06, 0.34, 0.12, 12, 0);
}

function noiseSound(ctx: AudioContext, filterType: BiquadFilterType, filterFreq: number, filterQ: number, attack: number, decay: number, peak: number) {
  const t = ctx.currentTime;
  const bufSize = Math.max(1, Math.floor((attack + decay) * ctx.sampleRate));
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = 2 * Math.random() - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const filter = ctx.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.value = filterFreq;
  filter.Q.value = filterQ;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(peak, t + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  src.connect(filter).connect(gain).connect(ctx.destination);
  src.start(t);
  src.stop(t + attack + decay + 0.01);
}

export function playWhisperSound(ctx: AudioContext) {
  if (ctx.state === 'suspended') ctx.resume();
  noiseSound(ctx, 'lowpass', 1200, 0.7, 0.04, 0.16, 0.1);
}

export function useClickSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
  }, []);

  useEffect(() => {
    function handleClick() {
      initAudio();
      if (localStorage.getItem('sound-muted') !== 'true') {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext();
        }
        playClickSound(audioCtxRef.current);
      }
    }

    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [initAudio]);

  return { initAudio };
}