// @flow
import type {BattleState, PlayerId} from "gbraver-burst-core/lib/flow-type";

/** 戦闘シーン全体の状態 */
export type BattleAppState = {
  /** 戦闘状態 */
  battleState: BattleState,
  /** 画面を開いているプレイヤーID */
  playerId: PlayerId,
}