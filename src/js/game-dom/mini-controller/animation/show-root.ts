import { Tween } from "@tweenjs/tween.js";
import { Animate } from "../../../animation/animate";
import { MiniControllerProps } from "../props";
import { tween } from "../../../animation/tween";

/** モデル */
type Model = {
  /** 透明度 */
  opacity: number;
};

export function showRoot(props: MiniControllerProps): Animate {
  const setUpdateHandler = (t: Tween<Model>): Tween<Model> => t.onUpdate(model => {
    props.root.style.opacity = `${model.opacity}`;
  });
  const model = { opacity: 0 };
  return tween(model, t => setUpdateHandler(t)
    .to({ opacity: 1 }, 200)
  );
}