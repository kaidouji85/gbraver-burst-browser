import { PilotButtonAnimationProps } from "../animation/animation-props";
import { PilotButtonView } from "../view/pilot-button-view";

/** パイロットボタン プロパティ */
export type PilotButtonProps = PilotButtonAnimationProps & {
  /** ビュー */
  view: PilotButtonView;
  /** パイロットボタンが操作不可能であるか否か、trueで操作不可能である */
  disabled: boolean;
};
