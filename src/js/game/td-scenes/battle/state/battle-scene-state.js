import type {PlayerId} from "gbraver-burst-core";

/** 戦闘シーン全体の状態 */
export type BattleSceneState = {
  /** 画面を開いているプレイヤーID */
  playerId: PlayerId,
  /** プレイヤーの入力を受け付けるか否か、trueで受け付ける */
  canOperation: boolean
}
