// @flow
import {EMPTY_PLAYER} from 'gbraver-burst-core';
import {EmptyCustomBattleEvent} from "../../../src/js/custom-battle-events/empty-custom-battle-event";
import {createTutorialState} from "../../../src/js/game/tutorial";
import {createEmptyNPC} from "../../data/npc";

const stage1 = {title: 'stage1', player: {...EMPTY_PLAYER, playerId: 'player01'}, npc: createEmptyNPC(), event: () => new EmptyCustomBattleEvent(), bgm: 'bgm01'};
const stage2 = {title: 'stage2', player: {...EMPTY_PLAYER, playerId: 'player02'}, npc: createEmptyNPC(), event: () => new EmptyCustomBattleEvent(), bgm: 'bgm02'};
const stage3 = {title: 'stage3', player: {...EMPTY_PLAYER, playerId: 'player03'}, npc: createEmptyNPC(), event: () => new EmptyCustomBattleEvent(), bgm: 'bgm03'};

test('チュートリアルステートを正しく生成することができる', () => {
  const stages = [stage1, stage2, stage3];
  expect(createTutorialState(stages)).toEqual({stages, stageIndex: 0});
});