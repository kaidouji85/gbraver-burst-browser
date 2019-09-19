// @flow

import TWEEN from '@tweenjs/tween.js';
import {Animate} from './animate';
import {tween} from "./tween";

/**
 * アニメーション中に任意処理を行う
 *
 * @param fn 処理内容
 * @param group TWeenGroup
 * @return アニメーション
 */
export function process(fn: () => void, group: ?TWEEN.Group): Animate {
  return tween({}, t => t
      .to({}, 0)
      .onStart(() => {
        fn();
      })
    , group)
}