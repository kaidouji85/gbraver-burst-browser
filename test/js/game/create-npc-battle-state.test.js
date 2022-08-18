// @flow
import {createNPCBattleState} from "../../../src/js/game/npc-battle";
import {DefaultStage} from "../../../src/js/game/npc-battle-courses";
import {EMPTY_PLAYER} from "../../data/player";

test('NPCバトルステートを正しく作ることができる', () => {
  const player = EMPTY_PLAYER;
  const stages = [DefaultStage, DefaultStage, DefaultStage];
  expect(createNPCBattleState(player, stages))
    .toEqual({player, stages, stageIndex: 0});
});
