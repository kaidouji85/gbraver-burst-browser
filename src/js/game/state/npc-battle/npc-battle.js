// @flow

import type {Player} from "gbraver-burst-core/lib/player/player";

/** 最大レベル */
export const MAX_LEVEL = 3;

/**
 * NPC戦闘
 */
export type NPCBattle = {
  type: 'NPCBattle',

  /** プレイヤー情報 */
  player: ?Player,

  /** ゲームレベル */
  level: number
};

/**
 * NPC戦闘の初期状態を生成する
 *
 * @return 生成結果
 */
export function createInitialNPCBattle(): NPCBattle {
  return {
    type: 'NPCBattle',
    player: null,
    level: 1,
  };
}