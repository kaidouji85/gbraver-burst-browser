import { PlayerState } from "gbraver-burst-core";

import { PlayerElements } from "./dom/player-elements";

/** 戦闘シミュレータのプロパティ */
export type BattleSimulatorProps = {
  /** ルートのHTML要素 */
  root: HTMLElement;
  /** プレイヤーのHTML要素 */
  playerElements: PlayerElements;
  /** 敵のHTML要素 */
  enemyElements: PlayerElements;

  /** プレイヤーのステート */
  player: PlayerState;
  /** プレイヤーがダイアログ上で選択しているバッテリー値 */
  playerBattery: number;
  /** 敵のステート */
  enemy: PlayerState;
  /** 敵がダイアログ上で選択しているバッテリー値 */
  enemyBattery: number;
  /** プレイヤーが攻撃側か否か、trueで攻撃側 */
  isPlayerAttacker: boolean;
};
