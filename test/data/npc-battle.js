// @flow
import type {NPCBattleState} from "../../src/js/game/npc-battle";
import {DefaultStage} from "../../src/js/game/npc-battle-courses";
import {EMPTY_PLAYER} from "./player";

/** 空のNPCバトルステート */
export const EMPTY_NPC_BATTLE_STATE: NPCBattleState = {
  player: EMPTY_PLAYER,
  isGameClear: false,
  stages: [
    DefaultStage,
    DefaultStage,
    DefaultStage,
  ],
  stageIndex: 0
};