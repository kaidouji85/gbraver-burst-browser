// @flow
import {EMPTY_PLAYER} from 'gbraver-burst-core';
import {EmptyCustomBattleEvent} from "../../../src/js/custom-battle-events/empty-custom-battle-event";
import {createTutorialState} from "../../../src/js/game/tutorial";
import {createEmptyNPC} from "../../data/npc";

const stage1 = {player: {...EMPTY_PLAYER, playerId: 'player-stage-01'}, npc: createEmptyNPC(), event: () => new EmptyCustomBattleEvent()};
const stage2 = {player: {...EMPTY_PLAYER, playerId: 'player-stage-02'}, npc: createEmptyNPC(), event: () => new EmptyCustomBattleEvent()};
const stage3 = {player: {...EMPTY_PLAYER, playerId: 'player-stage-03'}, npc: createEmptyNPC(), event: () => new EmptyCustomBattleEvent()};

test('チュートリアルステートを正しく生成することができる', () => {
  const stages = [stage1, stage2, stage3];
  expect(createTutorialState(stages)).toEqual({stages, stageIndex: 0});
});