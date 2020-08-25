// @flow

import type {NPCBattle} from "./npc-battle/npc-battle";

/**
 * 現在進行中のフローの状態を保持する
 */
export type InProgress = None | NPCBattle;

/**
 * 現在進行中のフローはない
 */
export type None = {
  type: 'None'
};