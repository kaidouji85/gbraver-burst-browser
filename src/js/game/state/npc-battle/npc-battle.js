// @flow

import type {Player} from "gbraver-burst-core/lib/player/player";

/**
 * NPCとの戦闘
 */
export type NPCBattle = {
  type: 'NPCBattle',

  /** プレイヤー情報 */
  player: Player,

  /** ゲームレベル */
  level: number
};