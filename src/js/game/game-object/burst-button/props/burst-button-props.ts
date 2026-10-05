import { BurstButtonAnimationProps } from "../animation/animation-props";
import { BurstButtonView } from "../view/burst-button-view";

/** バーストボタンプロパティ */
export type BurstButtonProps = BurstButtonAnimationProps & {
  /** ビュー */
  view: BurstButtonView;
  /** バーストボタンが操作不可能であるか否か、trueで操作不可能である */
  disabled: boolean;
};
