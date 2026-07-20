import * as TWEEN from "@tweenjs/tween.js";

import { SEPlayerContainer } from "../../../se/se-player";
import { DeathAlertModel } from "../model/death-alert-model";
import { DeathAlertSounds } from "../sounds/death-alert-sounds";
import { DeathAlertView } from "../view/death-alert-view";

/** デスアラートのプロパティ */
export type DeathAlertProps = SEPlayerContainer & {
  /** モデル */
  model: DeathAlertModel;
  /** TWEEN グループ */
  tweenGroup: TWEEN.Group;
  /** ビュー */
  view: DeathAlertView;
  /** サウンド */
  sounds: DeathAlertSounds;
  /** アラート済みかどうか、trueでアラート済み */
  isAlerted: boolean;
};
