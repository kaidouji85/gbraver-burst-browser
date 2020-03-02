// @flow

import type {Command, GameState, Player, PlayerId} from "gbraver-burst-core";

/** 初期状態 */
export type InitialState = {
  playerId: PlayerId,
  players: Player[],
  stateHistory: GameState[]
};

/** バトルルーム */
export interface BattleRoom {
  /** 戦闘開始 */
  start(): Promise<InitialState>;

  /** 戦闘を進める */
  progress(command: Command): Promise<GameState[]>
}