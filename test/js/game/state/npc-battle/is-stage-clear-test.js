// @flow

import test from 'ava';
import {isStageClear} from "../../../../../src/js/game/in-progress/npc-battle/npc-battle";
import {EMPTY_PLAYER} from "../../../../data/player";

const player: Player = {...EMPTY_PLAYER, playerId: 'test-player'};

test('勝者がプレイヤーの場合、ステージクリアである', t => {
  const win = {type: 'GameOver', winner: player.playerId};
  const result = isStageClear(player, win);
  t.true(result);
});

test('勝者がNPCの場合、ステージクリアではない', t => {
  const lose = {type: 'GameOver', winner: 'not-test-player'}; 
  const result = isStageClear(player, lose);
  t.false(result);
});

test('引き分けの場合、ステージクリアではない', t => {
  const evenMatch = {type: 'EvenMatch'};
  const result = isStageClear(player, evenMatch);
  t.false(result);
});
