// @flow

import test from 'ava';
import {endBattle} from "../../../../src/js/game/state/end-battle";
import type {State} from "../../../../src/js/game/state/state";
import {EMPTY_STATE} from "../../../data/state";
import type {EndBattle} from "../../../../src/js/action/game/battle";
import {EMPTY_PLAYER} from "../../../data/player";
import type {Player} from "gbraver-burst-core";

test('戦闘に勝利した場合はレベルが+1される', t => {
  const player: Player = {
    ...EMPTY_PLAYER,
    playerId: 'test-player'
  };
  const state: State = {
    ...EMPTY_STATE,
    player: player,
    level: 1
  };
  const action: EndBattle = {
    type: 'endBattle',
    gameEnd: {
      name: 'GameEnd',
      result: {
        type: 'GameOver',
        winner: player.playerId
      }
    }
  };

  const result = endBattle(state, action);
  const expected = {
    ...state,
    level: 2
  };
  t.deepEqual(result, expected);
});