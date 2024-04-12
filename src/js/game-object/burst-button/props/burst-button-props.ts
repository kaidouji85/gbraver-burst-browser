import { Subject } from "rxjs";

import { SoundResource } from "../../../resource/sound/resource";
import { BurstButtonModel } from "../model/burst-button-model";
import { BurstButtonView } from "../view/burst-button-view";

/** バーストボタンプロパティ */
export type BurstButtonProps = {
  /** モデル */
  model: BurstButtonModel;
  /** ビュー */
  view: BurstButtonView;
  /** 効果音 ボタン押下 */
  pushButtonSound: SoundResource;
  /** ボタン押下通知 */
  pushButton: Subject<Event>;
}