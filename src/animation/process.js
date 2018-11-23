// @flow

import {Animate} from './animate';
import {Group, Tween} from '@tweenjs/tween.js';
import {tween} from "./tween";

/**
 * アニメーション中に任意処理を行う
 *
 * @param fn 処理内容
 * @param group TWeenGroup
 * @return アニメーション
 */
export function process(fn: () => void, group: ?Group): Animate {
  return tween(new Tween({}, group)
    .to({}, 0)
    .onStart(() => {
      fn();
    })
  );
}