import { DeathAlertModel } from "../model/death-alert-model";
import { DeathAlertView } from "../view/death-alert-view";

/** デスアラートのプロパティ */
export type DeathAlertProps = {
  /** モデル */
  model: DeathAlertModel;
  /** ビュー */
  view: DeathAlertView;
};
