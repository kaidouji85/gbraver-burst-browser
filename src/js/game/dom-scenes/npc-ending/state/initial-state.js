// @flow

import type {NPCEndingState} from "./npc-ending-state";

/**
 * 初期状態を生成する
 *
 * @return 生成結果
 */
export function createInitialState(): NPCEndingState {
  return {
    canOperate: true
  };
}