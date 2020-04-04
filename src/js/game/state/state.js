// @flow

import type {Player} from "gbraver-burst-core";

/** Gameが持つ状態 */
export type State = {
  /** プレイヤー情報 */
  player: Player,
  /** ゲーム進捗状況 */
  level: number
};