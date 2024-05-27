import { PlayerState } from "gbraver-burst-core";

/** 戦闘シミュレーター通知情報 */
export type BattleSimulateNotify = {
  /** プレイヤーのステート */
  player: PlayerState;
  /** 敵のステート */
  enemy: PlayerState;
  /** プレイヤーが攻撃側であるか、trueで攻撃側 */
  isPlayerAttacker: boolean;
};
