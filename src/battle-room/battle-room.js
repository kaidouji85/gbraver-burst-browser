// @flow

import type {Command} from "gbraver-burst-core/lib/command/command";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";

/** 初期状態 */
export type InitialState = {
  playerId: PlayerId,
  players: Player[],
  stateHistory: GameState[]
};

/** バトルルーム */
export interface BattleRoom {
  /** 戦闘開始 */
  start(): InitialState;

  /** 戦闘を進める */
  progress(command: Command): Promise<GameState[]>
}