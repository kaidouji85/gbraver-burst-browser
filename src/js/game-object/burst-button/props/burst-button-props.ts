import { Subject } from "rxjs";

import { BurstButtonAnimationProps } from "../animation/animation-props";
import { BurstButtonView } from "../view/burst-button-view";

/** バーストボタンプロパティ */
export type BurstButtonProps = BurstButtonAnimationProps & {
  /** ビュー */
  view: BurstButtonView;
  /** ボタン押下通知 */
  pushButton: Subject<Event>;
}