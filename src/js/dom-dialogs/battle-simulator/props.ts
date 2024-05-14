import { PlayerId, PlayerState } from "gbraver-burst-core";

/** 戦闘シミュレータのプロパティ */
export type BattleSimulatorProps = {
  /** ルートのHTML要素 */
  root: HTMLElement;
  /** ゲームに参加しているプレイヤーのステート */
  players: [PlayerState, PlayerState];
  /** 画面を開いているプレイヤーID */
  playerId: PlayerId;
  /** 攻撃側プレイヤーID */
  activePlayerId: PlayerId;
};
