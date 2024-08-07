import { Group } from "@tweenjs/tween.js";
import { Subject } from "rxjs";

import { TimeScaleAnimationProps } from "../animation/animation-props";
import { TimeScaleButtonView } from "../view/time-scale-button-view";

/** タイムスケールボタン プロパティ */
export type TimeScaleButtonProps = TimeScaleAnimationProps & {
  /** ビュー */
  view: TimeScaleButtonView;
  /** トグルTweenグループ */
  toggleTween: Group;
  /** トグル通知 */
  toggleNotify: Subject<number>;
  /** 操作不可能であるか否か、trueで操作不可能 */
  disabled: boolean;
};
