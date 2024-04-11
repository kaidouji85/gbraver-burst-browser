import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { GenesisBraverAnimationProps } from "./animation-props";

/** アニメーション時間 */
const duration = 200;

/**
 * アクティブ状態を開始する
 * @param props アニメーションプロパティ
 * @return アニメーション
 */
export function startActive(props: GenesisBraverAnimationProps): Animate {
  const { model } = props;
  return all(
    tween(model.standard, (t) => t.to({ colorStrength: 0.8 }, duration)),
    tween(model.outline, (t) => t.to({ opacity: 1 }, duration)),
  );
}
