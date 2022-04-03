// @flow
import {DefaultStage} from "../../../src/js/game/npc-battle-courses";
import {EMPTY_PLAYER} from "../../data/player";
import {EMPTY_NPC_BATTLE_STATE} from "../../data/npc-battle";
import {updateNPCBattle} from "../../../src/js/game/npc-battle";

const stages = [DefaultStage, DefaultStage, DefaultStage];
const player = {...EMPTY_PLAYER, playerId: 'test-player'};
const state = {...EMPTY_NPC_BATTLE_STATE, stages, player, stageIndex: 0, isGameClear: false};
const win = {type: 'GameOver', winner: player.playerId};
const lose = {type: 'GameOver', winner: 'enemy'};
const draw = {type: 'EvenMatch'};

test('勝利した場合は次のステージに進む', () => {
  const data = {...state, stageIndex: 1};
  expect(updateNPCBattle(data, win))
    .toEqual({...data, stageIndex: data.stageIndex + 1});
});

test('敗北した場合はステート変更なし', () => {
  expect(updateNPCBattle(state, lose))
    .toEqual(state);
});

test('引き分けの場合はステート更新なし', () => {
  expect(updateNPCBattle(state, draw))
    .toEqual(state);
});

test('最終ステージで勝利した場合はゲームクリアとなる', () => {
  const data = {...state, stageIndex: stages.length - 1, isGameClear: false};
  expect(updateNPCBattle(data, win))
    .toEqual({...data, isGameClear: true});
});