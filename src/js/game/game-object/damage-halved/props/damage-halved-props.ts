import { DamageHalvedAnimationProps } from "../animation/animation-props";
import { DamageHalvedView } from "../view/damage-halved-view";

/** ダメージ半減 プロパティ */
export type DamageHalvedProps = DamageHalvedAnimationProps & {
  /** ビュー */
  view: DamageHalvedView;
};
