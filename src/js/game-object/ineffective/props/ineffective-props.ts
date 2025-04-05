import { IneffectiveAnimationProps } from "../animation/animation-props";
import { IneffectiveView } from "../view/ineffective-view";

/** 効果無効 プロパティ */
export type IneffectiveProps = IneffectiveAnimationProps & {
  /** ビュー */
  view: IneffectiveView;
};
