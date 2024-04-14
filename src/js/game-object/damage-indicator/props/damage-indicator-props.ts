import { DamageIndicatorModel } from "../model/damage-indicator-model";
import { DamageIndicatorView } from "../view/damage-indicator-view";

/** ダメージインジケータプロパティ */
export type DamageIndicatorProps = {
  /** モデル */
  model: DamageIndicatorModel;
  /** ビュー */
  view: DamageIndicatorView;
};
