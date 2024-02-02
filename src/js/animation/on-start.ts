import * as TWEEN from "@tweenjs/tween.js";

import { Animate } from "./animate";
import { tween } from "./tween";

/**
 * アニメーション開始時に任意処理を行う
 * @param fn 処理内容
 * @param group TWeenGroup
 * @return アニメーション
 */
export function onStart(fn: () => void, group?: TWEEN.Group): Animate {
  return tween(
    {},
    (t) =>
      t.to({}, 0).onStart(() => {
        fn();
      }),
    group,
  );
}
