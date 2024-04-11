import * as TWEEN from "@tweenjs/tween.js";
import { Subject } from "rxjs";

import { BatterySelectorModel } from "../model";
import { BatterySelectorSounds } from "../sounds/battery-selector-sounds";
import { BatterySelectorView } from "../view";

/** バッテリーセレクタプロパティ */
export type BatterySelectorProps = {
  /** モデル */
  model: BatterySelectorModel;
  /** ビュー */
  view: BatterySelectorView;
  /** 効果音 */
  sounds: BatterySelectorSounds;
  /** バッテリー変更TweenGroup */
  batteryChangeTween: TWEEN.Group;
  /** -ボタンTweenGroup */
  batteryMinusTween: TWEEN.Group;
  /** +ボタンTweenGroup */
  batteryPlusTween: TWEEN.Group;
  /** 決定ボタン押下通知ストリーム */
  decidePush: Subject<Event>;
  /** バッテリープラスボタン押下通知ストリーム */
  batteryPlusPush: Subject<void>;
  /** バッテリーマイナスボタン押下通知ストリーム */
  batteryMinusPush: Subject<void>;
};
