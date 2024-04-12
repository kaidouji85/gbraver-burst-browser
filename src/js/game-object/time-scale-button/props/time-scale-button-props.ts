import * as TWEEN from "@tweenjs/tween.js";
import { Subject } from "rxjs";

import { TimeScaleButtonModel } from "../model/time-scale-button-model";
import { TimeScaleButtonSounds } from "../sounds/time-scale-sounds";
import { TimeScaleButtonView } from "../view/time-scale-button-view";

/** タイムスケールボタン プロパティ */
export type TimeScaleButtonProps = {
  /** モデル */
  model: TimeScaleButtonModel;
  /** ビュー */
  view: TimeScaleButtonView;
  /** 効果音 */
  sounds: TimeScaleButtonSounds;
  /** トグルTweenグループ */
  toggleTween: TWEEN.Group;
  /** トグル通知 */
  toggle: Subject<number>;
};