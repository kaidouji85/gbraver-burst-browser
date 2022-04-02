// @flow
import {EMPTY_PLAYER} from "../../data/player";
import {DefaultStage} from "../../../src/js/game/npc-battle-course-master";
import {startNPCBattle} from "../../../src/js/game/npc-battle";

test('NPCバトルステートの初期状態を正しく作ることができる', () => {
  const player = EMPTY_PLAYER;
  const course = [DefaultStage, DefaultStage, DefaultStage];
  expect(startNPCBattle(player, course))
    .toEqual({player, course, stageIndex: 0, isGameClear: false});
});
