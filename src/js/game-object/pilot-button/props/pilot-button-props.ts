import { PilotButtonAnimationProps } from "../animation/animation-props";
import { PilotButtonView } from "../view/pilot-button-view";

/** パイロットボタン プロパティ */
export type PilotButtonProps = PilotButtonAnimationProps & {
  /** ビュー */
  view: PilotButtonView;
};
