// @flow

import test from 'ava';
import type {EndBattle} from "../../../../../src/js/action/game/battle";
import {EMPTY_PLAYER} from "../../../../data/player";
import type {Player, GameOver, EvenMatch} from "gbraver-burst-core";
import {EMPTY_END_BATTLE} from "../../../../data/end-battle";
import type {NPCBattle} from "../../../../../src/js/game/state/npc-battle/npc-battle";
import {EMPTY_NPC_BATTLE} from "../../../../data/npc-battle";
import {isWin} from "../../../../../src/js/game/state/npc-battle/level-up";

const player: Player = {
  ...EMPTY_PLAYER,
  playerId: 'test-player'
};

const win: GameOver = {
  type: 'GameOver',
  winner: player.playerId
};

const lose: GameOver = {
  type: 'GameOver',
  winner: 'not-test-player'
};

const evenMath: EvenMatch = {
  type: 'EvenMatch'
};

test('戦闘勝利条件を正しく判定できる', t => {
  const state: NPCBattle = {
    ...EMPTY_NPC_BATTLE,
    player: player,
    level: 1
  };
  const action: EndBattle = {
    ...EMPTY_END_BATTLE,
    gameEnd: {
      ...EMPTY_END_BATTLE.gameEnd,
      result: win
    }
  };

  const result = isWin(state, action);
  t.true(result);
});

test('NPCが勝利した場合falseを返す', t => {
  const state: NPCBattle = {
    ...EMPTY_NPC_BATTLE,
    player: player,
    level: 1
  };
  const action: EndBattle = {
    ...EMPTY_END_BATTLE,
    gameEnd: {
      ...EMPTY_END_BATTLE.gameEnd,
      result: lose
    }
  };

  const result = isWin(state, action);
  t.false(result);
});

test('引き分けの場合falseを返す', t => {
  const state: NPCBattle = {
    ...EMPTY_NPC_BATTLE,
    player: player,
    level: 1
  };
  const action: EndBattle = {
    ...EMPTY_END_BATTLE,
    gameEnd: {
      ...EMPTY_END_BATTLE.gameEnd,
      result: evenMath
    }
  };

  const result = isWin(state, action);
  t.false(result);
});
