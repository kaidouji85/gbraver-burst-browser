import { PlayerState } from "gbraver-burst-core";

/** 戦闘シミュレーター開始 */
export type BattleSimulatorStart = {
  type: "BattleSimulatorStart";
  /** プレイヤー */
  player: PlayerState;
  /** 敵 */
  enemy: PlayerState;
  /** プレイヤーが攻撃側か否か、trueで攻撃側 */
  isPlayerAttacker: boolean;
};
