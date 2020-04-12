// @flow

import type {Player} from "gbraver-burst-core";

/** 最大レベル */
export const MAX_LEVEL = 3;

/** Gameが持つ状態 */
export type State = {
  /** プレイヤー情報 */
  player: Player,
  /** ゲーム進捗状況 */
  level: number
};