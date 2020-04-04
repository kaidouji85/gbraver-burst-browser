// @flow

import type {State} from "../../src/js/game/state/state";
import {EMPTY_PLAYER} from "./player";

/**
 * 空のゲーム状態
 */
export const EMPTY_STATE: State = {
  player: EMPTY_PLAYER,
  level: 1
};