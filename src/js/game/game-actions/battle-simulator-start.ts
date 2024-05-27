import { PlayerId, PlayerState } from "gbraver-burst-core";

/** 戦闘シミュレーター開始 */
export type BattleSimulatorStart = {
  type: "BattleSimulatorStart";
  /** 画面を開いているプレイヤーID */
  playerId: PlayerId;
  /** ゲームに参加しているプレイヤーのステート */
  players: PlayerState[];
};
