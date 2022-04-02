// @flow
import {EMPTY_NPC_BATTLE_STATE} from "../../data/npc-battle";
import {DefaultStage} from "../../../src/js/game/npc-battle-course-master";
import {isLastStage} from "../../../src/js/game/npc-battle";

const course = [DefaultStage, DefaultStage, DefaultStage];
const state = {...EMPTY_NPC_BATTLE_STATE, course};

test('(course配列要素数 - 1 = stageIndex)の場合、ラストステージである', () => {
  const data = {...state, stageIndex: 2};
  expect(isLastStage(data)).toBe(true);
});

test('(course配列要素数 -1 != stageIndex)の場合、ラストステージでない', () => {
  const data = {...state, stageIndex: 0};
  expect(isLastStage(data)).toBe(false);
});