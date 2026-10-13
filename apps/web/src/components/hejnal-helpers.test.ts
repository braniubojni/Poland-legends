import { describe, expect, it, vi } from "vitest";
import { playHejnal } from "./hejnal-helpers";

describe("playHejnal", () => {
  it("starts seven notes and cuts the last one short", () => {
    const stops: number[] = [];
    const ctx = {
      currentTime: 1,
      destination: {},
      createOscillator: () => ({
        type: "",
        frequency: { value: 0 },
        connect: vi.fn(),
        start: vi.fn(),
        stop: (t: number) => stops.push(t),
      }),
      createGain: () => ({
        gain: {
          setValueAtTime: vi.fn(),
          linearRampToValueAtTime: vi.fn(),
        },
        connect: vi.fn(),
      }),
      createBiquadFilter: () => ({
        type: "",
        frequency: { value: 0 },
        connect: vi.fn(),
      }),
    };

    playHejnal(ctx as unknown as AudioContext);

    expect(stops).toHaveLength(7);
    const start = 1.05;
    expect(stops[0]).toBeCloseTo(start + 0.22 + 0.02);
    expect(stops[6]).toBeCloseTo(start + 6 * 0.28 + 0.12);
  });
});
