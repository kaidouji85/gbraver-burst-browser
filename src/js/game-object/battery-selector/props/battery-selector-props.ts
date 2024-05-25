import * as TWEEN from "@tweenjs/tween.js";

import { BatterySelectorAnimationProps } from "../animation/animation-props";
import { BatterySelectorView } from "../view";

/** バッテリーセレクタプロパティ */
export type BatterySelectorProps = BatterySelectorAnimationProps & {
  /** ビュー */
  view: BatterySelectorView;
  /** 操作不可能であるか否か、trueで操作不可能 */
  disabled: boolean;
  /** バッテリー変更TweenGroup */
  batteryChangeTween: TWEEN.Group;
  /** -ボタンTweenGroup */
  batteryMinusTween: TWEEN.Group;
  /** +ボタンTweenGroup */
  batteryPlusTween: TWEEN.Group;
};
