import * as TWEEN from "@tweenjs/tween.js";

import { BatterySelectorAnimationProps } from "../animation/animation-props";
import { BatterySelectorView } from "../view";

/** バッテリーセレクタプロパティ */
export type BatterySelectorProps = BatterySelectorAnimationProps & {
  /** ビュー */
  view: BatterySelectorView;
  /** バッテリー変更TweenGroup */
  batteryChangeTween: TWEEN.Group;
  /** -ボタンTweenGroup */
  batteryMinusTween: TWEEN.Group;
  /** +ボタンTweenGroup */
  batteryPlusTween: TWEEN.Group;
};
