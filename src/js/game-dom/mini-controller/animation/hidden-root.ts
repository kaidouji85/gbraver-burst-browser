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
 * ルート要素を非表示にする
 * @param props コンポネントプロパティ
 * @returns アニメーション
 */
export function hiddenRoot(props: MiniControllerProps): Animate {
  const setUpdateHandler = (t: TWEEN.Tween<Model>): TWEEN.Tween<Model> =>
    t.onUpdate((model) => {
      props.root.style.opacity = `${model.opacity}`;
    });
  const model = { opacity: 1 };
  return tween(model, (t) => setUpdateHandler(t).to({ opacity: 0 }, 200));
}
