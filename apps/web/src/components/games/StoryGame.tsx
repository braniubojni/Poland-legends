import type { Game } from "@/data/types";
import { OrderGame } from "./OrderGame";
import { QuizGame } from "./QuizGame";
import { TowersGame } from "./TowersGame";

export function StoryGame({ game, onComplete }: { game: Game; onComplete: () => void }) {
  if (game.kind === "quiz") {
    return <QuizGame questions={game.questions} onComplete={onComplete} />;
  }
  if (game.kind === "order") {
    return (
      <OrderGame
        prompt={game.prompt}
        steps={game.steps}
        correct={game.correct}
        onComplete={onComplete}
      />
    );
  }
  return <TowersGame prompt={game.prompt} explanation={game.explanation} onComplete={onComplete} />;
}
