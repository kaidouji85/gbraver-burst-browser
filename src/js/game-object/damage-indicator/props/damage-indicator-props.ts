import { DamageIndicatorView } from "../view/damage-indicator-view";
import { DamageIndicatorAnimationProps } from "../animation/animation-props";

/** ダメージインジケータプロパティ */
export type DamageIndicatorProps = DamageIndicatorAnimationProps & {
  /** ビュー */
  view: DamageIndicatorView;
};
