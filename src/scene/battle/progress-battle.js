import type {Command} from "gbraver-burst-core/lib/command/command";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";

export type ProgressBattle = (command: Command) => Promise<GameState[]>;