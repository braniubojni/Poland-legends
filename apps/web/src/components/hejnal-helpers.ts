export const playHejnal = (ctx: AudioContext) => {
  const notes = [349.23, 440, 523.25, 587.33, 523.25, 440, 392];
  const start = ctx.currentTime + 0.05;
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.value = freq;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1400;
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    const t0 = start + i * 0.28;
    const t1 = t0 + 0.22;
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(0.08, t0 + 0.03);
    if (i === notes.length - 1) {
      gain.gain.linearRampToValueAtTime(0.08, t0 + 0.08);
      gain.gain.setValueAtTime(0, t0 + 0.09);
      osc.start(t0);
      osc.stop(t0 + 0.12);
    } else {
      gain.gain.linearRampToValueAtTime(0.001, t1);
      osc.start(t0);
      osc.stop(t1 + 0.02);
    }
  });
};
