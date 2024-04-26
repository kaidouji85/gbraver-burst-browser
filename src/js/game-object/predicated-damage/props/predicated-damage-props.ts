import { PredicatedDamageModel } from "../model/predicated-damage-model"
import { PredicatedDamageView } from "../view/predicated-model-view";

/** ダメージ予想 プロパティ */
export type PredicatedDamageProps = {
  /** モデル */
  model: PredicatedDamageModel;
  /** ビュー */
  view: PredicatedDamageView;
}