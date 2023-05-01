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
 * @return アニメーション
 */
export function popRoot(props: MiniControllerProps): Animate {
  const engage = (model: Model): void => {
    props.root.style.transform = `scale(${model.scale})`;
  };
  const model = {scale: 1};
  return tween(model, t => t
    .to({scale: 1.1}, 100)
    .onUpdate(engage)
  ).chain(tween(model, t => t
    .to({scale: 1}, 100)
    .onUpdate(engage)
  ));
}