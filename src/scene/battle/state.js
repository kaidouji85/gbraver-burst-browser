import type {BattleState, PlayerId} from "gbraver-burst-core/lib/flow-type";

/** 戦闘シーン全体の状態 */
export type BattleSceneState = {
  /** 画面を開いているプレイヤーID */
  playerId: PlayerId,
  /** 最後に設定したバッテリースライダーの値 */
  lastBatteryValue: number,
}