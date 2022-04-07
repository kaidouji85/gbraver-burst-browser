// @flow
import {EMPTY_PLAYER} from "../../data/player";
import {isStageClear} from "../../../src/js/game/npc-battle";

const player = {...EMPTY_PLAYER, playerId: 'test-player'};

test('勝者がプレイヤーの場合、ステージクリアである', () => {
  const win = {type: 'GameOver', winner: player.playerId};
  const result = isStageClear(player, win);
  expect(result).toBe(true);
});

test('勝者がNPCの場合、ステージクリアではない', () => {
  const lose = {type: 'GameOver', winner: 'not-test-player'}; 
  const result = isStageClear(player, lose);
  expect(result).toBe(false);
});

test('引き分けの場合、ステージクリアではない', () => {
  const evenMatch = {type: 'EvenMatch'};
  const result = isStageClear(player, evenMatch);
  expect(result).toBe(false);
});
