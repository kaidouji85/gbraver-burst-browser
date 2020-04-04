// @flow

import test from 'ava';
import {endBattle} from "../../../../src/js/game/state/end-battle";
import type {State} from "../../../../src/js/game/state/state";
import {EMPTY_STATE} from "../../../data/state";
import type {EndBattle} from "../../../../src/js/action/game/battle";
import {EMPTY_PLAYER} from "../../../data/player";
import type {Player, GameEndResult} from "gbraver-burst-core";
import {EMPTY_END_BATTLE} from "../../../data/end-battle";

const player: Player = {
  ...EMPTY_PLAYER,
  playerId: 'test-player'
};

const win: GameEndResult = {
  type: 'GameOver',
  winner: player.playerId
};

const lose: GameEndResult = {
  type: 'GameOver',
  winner: 'not-test-player'
};

const evenMath: GameEndResult = {
  type: 'EvenMatch'
};

test('戦闘に勝利した場合はレベルが+1される', t => {
  const state: State = {
    ...EMPTY_STATE,
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

  const result = endBattle(state, action);
  const expected = {
    ...state,
    level: 2
  };
  t.deepEqual(result, expected);
});

test('戦闘に敗北した場合はレベルがそのまま', t => {
  const state: State = {
    ...EMPTY_STATE,
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

  const result = endBattle(state, action);
  t.deepEqual(result, state);
});

test('引き分けの場合はレベルがそのまま', t => {
  const state: State = {
    ...EMPTY_STATE,
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

  const result = endBattle(state, action);
  t.deepEqual(result, state);
});