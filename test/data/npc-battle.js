// @flow

import type {NPCBattle} from "../../src/js/game/state/npc-battle/npc-battle";

/**
 * 空のNPC戦闘
 */
export const EMPTY_NPC_BATTLE: NPCBattle = {
  type: 'NPCBattle',
  player: null,
  level: 1
}