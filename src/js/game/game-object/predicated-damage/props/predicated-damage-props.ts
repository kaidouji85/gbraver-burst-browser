import { PredicatedDamageAnimationProps } from "../animation/animation-props";
import { PredicatedDamageView } from "../view/predicated-damage-view";

/** ダメージ予想 プロパティ */
export type PredicatedDamageProps = PredicatedDamageAnimationProps & {
  /** ビュー */
  view: PredicatedDamageView;
  /** 操作不可能であるか否か、trueで操作不可能 */
  disabled: boolean;
};
