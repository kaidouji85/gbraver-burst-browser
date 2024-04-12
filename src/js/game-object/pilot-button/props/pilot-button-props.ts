import { Subject } from "rxjs";

import { PilotButtonAnimationProps } from "../animation/animation-props";
import { PilotButtonView } from "../view/pilot-button-view";

/** パイロットボタン プロパティ */
export type PilotButtonProps = PilotButtonAnimationProps & {
  /** ビュー */
  view: PilotButtonView;
  /** ボタン押下通知 */
  pushButton: Subject<Event>;
}