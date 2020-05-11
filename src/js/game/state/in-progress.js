// @flo

import type {NPCBattleCourse} from "./npc-battle/npc-battle-course";

/**
 * 現在進行中のフローの状態を保持する
 */
export type InProgress = None | NPCBattleCourse;

/**
 * 現在進行中のフローはない
 */
export type None = {
  type: 'None'
};