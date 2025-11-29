import { Group } from "@tweenjs/tween.js";

import { BatterySelectorAnimationProps } from "../animation/animation-props";
import { BatterySelectorView } from "../view";

/** バッテリーセレクタプロパティ */
export type BatterySelectorProps = BatterySelectorAnimationProps & {
  /** ビュー */
  view: BatterySelectorView;
  /** 操作不可能であるか否か、trueで操作不可能 */
  disabled: boolean;
  /** バッテリー変更TweenGroup */
  batteryChangeTween: Group;
  /** -ボタンTweenGroup */
  batteryMinusTween: Group;
  /** +ボタンTweenGroup */
  batteryPlusTween: Group;
  /** 注目アニメーションTweenGroup */
  attentionTween: Group;
};
