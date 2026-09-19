export const shuffle = <T>(items: T[]) => {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = next[i];
    const b = next[j];
    if (a === undefined || b === undefined) continue;
    next[i] = b;
    next[j] = a;
  }
  return next;
};

export const orderStepTone = (order: number, status: "play" | "wrong" | "right") => {
  let borderColor = "divider";
  let bgcolor = "background.default";
  if (order >= 0 && status === "play") {
    borderColor = "color-mix(in srgb, var(--op-primary) 40%, transparent)";
    bgcolor = "color-mix(in srgb, var(--op-primary) 10%, transparent)";
  } else if (order >= 0 && status === "right") {
    borderColor = "success.main";
    bgcolor = "color-mix(in srgb, var(--op-success) 10%, transparent)";
  } else if (order >= 0 && status === "wrong") {
    borderColor = "primary.main";
    bgcolor = "color-mix(in srgb, var(--op-primary) 10%, transparent)";
  }
  return { borderColor, bgcolor };
};
