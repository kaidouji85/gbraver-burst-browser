// @flow
import {EMPTY_PLAYER} from "../../data/player";
import {DefaultStage} from "../../../src/js/game/npc-battle-courses";
import {startNPCBattle} from "../../../src/js/game/npc-battle";

test('NPCバトルステートの初期状態を正しく作ることができる', () => {
  const player = EMPTY_PLAYER;
  const stages = [DefaultStage, DefaultStage, DefaultStage];
  expect(startNPCBattle(player, stages))
    .toEqual({player, stages, stageIndex: 0, isGameClear: false});
});
