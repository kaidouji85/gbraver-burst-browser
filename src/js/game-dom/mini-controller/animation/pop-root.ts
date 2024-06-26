import * as TWEEN from "@tweenjs/tween.js";

import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import { MiniControllerProps } from "../props";

/** モデル */
type Model = {
  /** スケール */
  scale: number;
};

/**
 * ルート要素をpopさせるアニメーション
 * @param props コンポネントプロパティ
 * @returns アニメーション
 */
export function popRoot(props: MiniControllerProps): Animate {
  const setUpdateHandler = (t: TWEEN.Tween<Model>): TWEEN.Tween<Model> =>
    t.onUpdate((model) => {
      props.root.style.transform = `scale(${model.scale})`;
    });
  const model = { scale: 1 };
  return tween(model, (t) => setUpdateHandler(t).to({ scale: 1.1 }, 100)).chain(
    tween(model, (t) => setUpdateHandler(t).to({ scale: 1 }, 100)),
  );
}
