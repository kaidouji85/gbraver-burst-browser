// @flow

import type {Command} from "gbraver-burst-core/lib/command/command";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";

/** バトルルーム */
export interface BattleRoom {
  /** 戦闘を進める */
  progress(command: Command): Promise<GameState[]>
}