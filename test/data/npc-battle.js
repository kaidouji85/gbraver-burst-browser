// @flow

import type {NPCBattle} from "../../src/js/game/in-progress/npc-battle/npc-battle";

/**
 * 空のNPCバトル
 */
export const EMPTY_NPC_BATTLE: NPCBattle = {
  type: 'NPCBattle',
  subFlow: {type: 'PlayerSelect'},
  player: null,
  level: 1
}