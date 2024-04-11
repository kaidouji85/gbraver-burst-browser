import * as TWEEN from "@tweenjs/tween.js";

import { BatterySelectorModel } from "../model";
import { BatterySelectorSounds } from "../sounds/battery-selector-sounds";

/** バッテリーセレクタ アニメーション プロパティ */
export type BatterySelectorAnimationProps = {
  /** モデル */
  model: BatterySelectorModel;
  /** 効果音 */
  sounds: BatterySelectorSounds;
  /** バッテリー変更TweenGroup */
  batteryChangeTween: TWEEN.Group;
  /** -ボタンTweenGroup */
  batteryMinusTween: TWEEN.Group;
  /** +ボタンTweenGroup */
  batteryPlusTween: TWEEN.Group;
};
