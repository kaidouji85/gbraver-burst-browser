import { BurstButtonAnimationProps } from "../animation/animation-props";
import { BurstButtonView } from "../view/burst-button-view";

/** バーストボタンプロパティ */
export type BurstButtonProps = BurstButtonAnimationProps & {
  /** ビュー */
  view: BurstButtonView;
};
