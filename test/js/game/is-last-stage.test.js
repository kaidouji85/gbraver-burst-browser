// @flow
import {EMPTY_NPC_BATTLE_STATE} from "../../data/npc-battle";
import {DefaultStage} from "../../../src/js/game/npc-battle-course-master";
import {isLastStage} from "../../../src/js/game/npc-battle";

const course = [DefaultStage, DefaultStage, DefaultStage];
const state = {...EMPTY_NPC_BATTLE_STATE, course};

test('courseの配列要素数とstageIndexが同じ場合、ラストステージである', () => {
  const data = {...state, stageIndex: 3};
  expect(isLastStage(data)).toBe(true);
});

test('courseの配列要素数とstageIndexが異なる場合、ラストステージでない', () => {
  const data = {...state, stageIndex: 2};
  expect(isLastStage(data)).toBe(false);
});