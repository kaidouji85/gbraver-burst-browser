// @flow

import type {Player} from "gbraver-burst-core";
import type {InProgress} from "./in-progress";

/** 最大レベル */
export const MAX_LEVEL = 3;

/** Gameが持つ状態 */
export type State = {
  // TODO 削除する
  /** プレイヤー情報 */
  player: Player,

  // TODO 削除する
  /** ゲーム進捗状況 */
  level: number,

  /** 現在進行中のフロー */
  inProgress: InProgress,
};