import { DamageIndicatorAnimationProps } from "../animation/animation-props";
import { DamageIndicatorView } from "../view/damage-indicator-view";

/** ダメージインジケータプロパティ */
export type DamageIndicatorProps = DamageIndicatorAnimationProps & {
  /** ビュー */
  view: DamageIndicatorView;
};
