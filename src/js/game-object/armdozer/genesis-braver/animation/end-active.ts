import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { GenesisBraverAnimationProps } from "./animation-props";

/** アニメーション時間 */
const duration = 200;

/**
 * アクティブ状態を終了する
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function endActive(props: GenesisBraverAnimationProps): Animate {
  const { model } = props;
  return all(
    tween(model.standard, (t) => t.to({ colorStrength: 1 }, duration)),
    tween(model.outline, (t) => t.to({ opacity: 0 }, duration)),
  );
}
