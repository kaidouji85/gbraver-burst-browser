import * as TWEEN from "@tweenjs/tween.js";

import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import { MiniControllerProps } from "../props";

/** モデル */
type Model = {
  /** 不透明度 */
  opacity: number;
};

/**
 * ルート要素を表示する
 * @param props コンポネントプロパティ
 * @returns アニメーション
 */
export function showRoot(props: MiniControllerProps): Animate {
  const setUpdateHandler = (t: TWEEN.Tween<Model>): TWEEN.Tween<Model> =>
    t.onUpdate((model) => {
      props.root.style.opacity = `${model.opacity}`;
    });
  const model = { opacity: 0 };
  return tween(model, (t) => setUpdateHandler(t).to({ opacity: 1 }, 200));
}
