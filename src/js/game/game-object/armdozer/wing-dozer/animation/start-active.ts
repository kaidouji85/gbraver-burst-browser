import { all } from "../../../../../animation/object-animation/all";
import { Animate } from "../../../../../animation/object-animation/animate";
import { tween } from "../../../../../animation/object-animation/tween";
import { WingDozerAnimationProps } from "./animation-props";

/** アニメーション時間 */
const duration = 200;

/**
 * アクティブ状態を開始する
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function startActive(props: WingDozerAnimationProps): Animate {
  const { model } = props;
  return all(
    tween(model.standard, (t) => t.to({ colorStrength: 0.8 }, duration)),
    tween(model.outline, (t) => t.to({ opacity: 1 }, duration)),
  );
}
