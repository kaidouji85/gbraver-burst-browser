import { Subject } from "rxjs";

import { PilotButtonModel } from "../model/pilot-button-model";
import { PilotButtonSounds } from "../sounds/pilot-button-sounds";
import { PilotButtonView } from "../view/pilot-button-view";

/** パイロットボタン プロパティ */
export type PilotButtonProps = {
  /** モデル */
  model: PilotButtonModel;
  /** 効果音 */
  sounds: PilotButtonSounds;
  /** ビュー */
  view: PilotButtonView;
  /** ボタン押下通知 */
  pushButton: Subject<Event>;
}