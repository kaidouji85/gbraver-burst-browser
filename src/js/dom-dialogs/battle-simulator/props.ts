import { PlayerId, PlayerState } from "gbraver-burst-core";

/** プレイヤーに関する要素 */
export type PlayerElement = {
  /** プレイヤーID */
  playerId: PlayerId;
  /** ダメージ */
  damage: HTMLElement;
  /** HP */
  hp: HTMLElement;
  /** バッテリー値 */
  batteryValue: HTMLElement;
  /** バッテリー補正 */
  batteryCorrect: HTMLElement;
}

/** 戦闘シミュレータのプロパティ */
export type BattleSimulatorProps = {
  /** ルートのHTML要素 */
  root: HTMLElement;
  /** プレイヤーに関する要素 */
  playerElements: [PlayerElement, PlayerElement];
  /** ゲームに参加しているプレイヤーのステート */
  players: [PlayerState, PlayerState];
  /** 画面を開いているプレイヤーID */
  playerId: PlayerId;
  /** 攻撃側プレイヤーID */
  activePlayerId: PlayerId;
};
