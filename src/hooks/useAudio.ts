let _ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  try {
    if (!_ctx) _ctx = new AudioContext();
    if (_ctx.state === "suspended") void _ctx.resume();
    return _ctx;
  } catch {
    return null;
  }
}

function tone(
  freq: number,
  dur: number,
  type: OscillatorType = "sine",
  vol = 0.22,
  delay = 0
) {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);
  osc.type = type;
  osc.frequency.value = freq;
  const t = c.currentTime + delay;
  gain.gain.setValueAtTime(vol, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
  osc.start(t);
  osc.stop(t + dur);
}

let _muted = localStorage.getItem("mp_muted") === "true";

export const audio = {
  muted: () => _muted,
  setMuted: (m: boolean) => {
    _muted = m;
    localStorage.setItem("mp_muted", String(m));
  },

  correct() {
    if (_muted) return;
    tone(523, 0.12, "sine", 0.25, 0);
    tone(659, 0.12, "sine", 0.25, 0.13);
    tone(784, 0.22, "sine", 0.28, 0.26);
  },

  wrong() {
    if (_muted) return;
    tone(330, 0.09, "sawtooth", 0.18, 0);
    tone(220, 0.22, "sawtooth", 0.15, 0.12);
  },

  click() {
    if (_muted) return;
    tone(880, 0.04, "sine", 0.1, 0);
  },

  victory() {
    if (_muted) return;
    [523, 659, 784, 1047].forEach((f, i) =>
      tone(f, 0.18, "sine", 0.28, i * 0.13)
    );
  },

  start() {
    if (_muted) return;
    tone(440, 0.09, "sine", 0.2, 0);
    tone(554, 0.09, "sine", 0.2, 0.11);
    tone(659, 0.16, "sine", 0.22, 0.22);
  },
};
