// @flow

import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import {Tween} from '@tweenjs/tween.js';

/**
 * 状態に応じた戦闘シーンのアニメーションを再生する
 *
 * @param state
 */
export function animation(state: GameState[]): MultiTween {
  // TODO アニメーションを実装する
  return {
    start: new Tween({}),
    end: new Tween({}),
  };
}