// @flow
import {EMPTY_PLAYER} from "../../data/player";
import {isNPCBattleStageClear} from "../../../src/js/game/npc-battle";
import {EMPTY_NPC_BATTLE_STATE} from "../../data/npc-battle";

const player = {...EMPTY_PLAYER, playerId: 'test-player'};
const state = {...EMPTY_NPC_BATTLE_STATE, player};

test('勝者がプレイヤーの場合、ステージクリアである', () => {
  const win = {type: 'GameOver', winner: player.playerId};
  const result = isNPCBattleStageClear(state, win);
  expect(result).toBe(true);
});

test('勝者がNPCの場合、ステージクリアではない', () => {
  const lose = {type: 'GameOver', winner: 'not-test-player'}; 
  const result = isNPCBattleStageClear(state, lose);
  expect(result).toBe(false);
});

test('引き分けの場合、ステージクリアではない', () => {
  const evenMatch = {type: 'EvenMatch'};
  const result = isNPCBattleStageClear(state, evenMatch);
  expect(result).toBe(false);
});
