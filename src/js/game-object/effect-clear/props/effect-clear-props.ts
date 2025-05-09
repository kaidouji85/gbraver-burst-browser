import { EffectClearAnimationProps } from "../animation/animation-props";
import { EffectClearView } from "../view/effect-clear-view";

/** 効果消去 プロパティ */
export type EffectClearProps = EffectClearAnimationProps & {
  /** ビュー */
  view: EffectClearView;
};
