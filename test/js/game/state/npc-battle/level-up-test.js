// @flow

import test from 'ava';
import type {EndBattle} from "../../../../../src/js/action/game/battle";
import {EMPTY_PLAYER} from "../../../../data/player";
import type {Player, GameOver, EvenMatch} from "gbraver-burst-core";
import {EMPTY_END_BATTLE} from "../../../../data/end-battle";
import type {NPCBattle} from "../../../../../src/js/game/state/npc-battle/npc-battle";
import {EMPTY_NPC_BATTLE} from "../../../../data/npc-battle";
import {levelUp} from "../../../../../src/js/game/state/npc-battle/level-up";
import {MAX_LEVEL} from "../../../../../src/js/game/state/npc-battle/npc-battle";

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

test('戦闘に勝利した場合はレベルが+1される', t => {
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

  const result = levelUp(state, action);
  const expected = {
    ...state,
    level: 2
  };
  t.deepEqual(result, expected);
});

test('戦闘に敗北した場合はレベルがそのまま', t => {
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

  const result = levelUp(state, action);
  t.deepEqual(result, state);
});

test('引き分けの場合はレベルがそのまま', t => {
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

  const result = levelUp(state, action);
  t.deepEqual(result, state);
});

test('戦闘に勝利しても最大レベルの場合にはそのまま', t => {
  const state: NPCBattle = {
    ...EMPTY_NPC_BATTLE,
    player: player,
    level: MAX_LEVEL
  };
  const action: EndBattle = {
    ...EMPTY_END_BATTLE,
    gameEnd: {
      ...EMPTY_END_BATTLE.gameEnd,
      result: win
    }
  };

  const result = levelUp(state, action);
  t.deepEqual(result, state);
});