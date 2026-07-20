import * as TWEEN from "@tweenjs/tween.js";

import { DeathAlertModel } from "../model/death-alert-model";
import { DeathAlertView } from "../view/death-alert-view";

/** デスアラートのプロパティ */
export type DeathAlertProps = {
  /** モデル */
  model: DeathAlertModel;
  /** TWEEN グループ */
  tweenGroup: TWEEN.Group;
  /** ビュー */
  view: DeathAlertView;
};
