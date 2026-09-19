export const quizOptionTone = (revealed: boolean, isCorrect: boolean, isPick: boolean) => {
  let borderColor = "divider";
  let bgcolor = "background.default";
  let color = "text.primary";
  if (revealed && isCorrect) {
    borderColor = "success.main";
    bgcolor = "color-mix(in srgb, var(--op-success) 10%, transparent)";
  } else if (revealed && isPick && !isCorrect) {
    borderColor = "primary.main";
    bgcolor = "color-mix(in srgb, var(--op-primary) 10%, transparent)";
  } else if (revealed && !isCorrect && !isPick) {
    color = "text.secondary";
  }
  return { borderColor, bgcolor, color };
};
