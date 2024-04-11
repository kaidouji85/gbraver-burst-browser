import { Subject } from "rxjs";

import { BatterySelectorAnimationProps } from "../animation/animation-props";
import { BatterySelectorView } from "../view";

/** バッテリーセレクタプロパティ */
export type BatterySelectorProps = BatterySelectorAnimationProps & {
  /** ビュー */
  view: BatterySelectorView;
  /** 決定ボタン押下通知ストリーム */
  decidePush: Subject<Event>;
  /** バッテリープラスボタン押下通知ストリーム */
  batteryPlusPush: Subject<void>;
  /** バッテリーマイナスボタン押下通知ストリーム */
  batteryMinusPush: Subject<void>;
};
