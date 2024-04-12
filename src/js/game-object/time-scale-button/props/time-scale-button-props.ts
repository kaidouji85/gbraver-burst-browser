import * as TWEEN from "@tweenjs/tween.js";
import { Subject } from "rxjs";

import { TimeScaleAnimationProps } from "../animation/animation-props";
import { TimeScaleButtonView } from "../view/time-scale-button-view";

/** タイムスケールボタン プロパティ */
export type TimeScaleButtonProps = TimeScaleAnimationProps & {
  /** ビュー */
  view: TimeScaleButtonView;
  /** トグルTweenグループ */
  toggleTween: TWEEN.Group;
  /** トグル通知 */
  toggleNotify: Subject<number>;
};
