// @flow
import {updateNPCBattle} from "../../../src/js/game/npc-battle";
import {DefaultStage} from "../../../src/js/game/npc-battle-courses";
import {EMPTY_NPC_BATTLE_STATE} from "../../data/npc-battle";
import {EMPTY_PLAYER} from "../../data/player";

const stages = [DefaultStage, DefaultStage, DefaultStage, DefaultStage];
const player = {...EMPTY_PLAYER, playerId: 'test-player'};
const state = {...EMPTY_NPC_BATTLE_STATE, stages, player, stageIndex: 0, isGameClear: false};

test('ステージクリアした場合、次のステージに進む︎', () => {
  const data = {...state, stageIndex: 1};
  expect(updateNPCBattle(data, true))
    .toEqual({...data, stageIndex: data.stageIndex + 1});
});

test('ステージ失敗した場合、ステートは変わらない', () => {
  expect(updateNPCBattle(state, false))
    .toEqual(state);
});

test('最終ステージをクリアした場合、ゲームクリア', () => {
  const data = {...state, stageIndex: stages.length - 1, isGameClear: false};
  expect(updateNPCBattle(data, true))
    .toEqual({...data, isGameClear: true});
});

test('最終ステージに失敗した場合、ステートは変わらない', () => {
  const data = {...state, stageIndex: stages.length - 1, isGameClear: false};
  expect(updateNPCBattle(data, false))
    .toEqual(data);
});