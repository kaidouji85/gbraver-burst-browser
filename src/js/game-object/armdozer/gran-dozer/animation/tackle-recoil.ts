import { Animate } from "../../../../animation/animate";
import { tween } from "../../../../animation/tween";
import { GranDozerAnimationProps } from "./animation-props";

/**
 * タックル反動
 * @param props アニメーションプロパティ
 * @returns アニメーション
 */
export function tackleRecoil(props: GranDozerAnimationProps): Animate {
  const { model } = props;
  return tween(model.position, (t) => t.to({ x: "+100" }, 50));
}
