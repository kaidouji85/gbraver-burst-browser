// @flow
import {EMPTY_NPC_BATTLE_STATE} from "../../data/npc-battle";
import {DefaultStage} from "../../../src/js/game/npc-battle-courses";
import {isLastStage} from "../../../src/js/game/npc-battle";

const stages = [DefaultStage, DefaultStage, DefaultStage];
const state = {...EMPTY_NPC_BATTLE_STATE, stages};

test('(stages配列要素数 - 1 = stageIndex)の場合、ラストステージである', () => {
  const data = {...state, stageIndex: 2};
  expect(isLastStage(data)).toBe(true);
});

test('(stages配列要素数 -1 != stageIndex)の場合、ラストステージでない', () => {
  const data = {...state, stageIndex: 0};
  expect(isLastStage(data)).toBe(false);
});