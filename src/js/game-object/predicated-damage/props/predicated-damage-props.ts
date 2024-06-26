import { PredicatedDamageModel } from "../model/predicated-damage-model";
import { PredicatedDamageView } from "../view/predicated-model-view";

/** ダメージ予想 プロパティ */
export type PredicatedDamageProps = {
  /** モデル */
  model: PredicatedDamageModel;
  /** ビュー */
  view: PredicatedDamageView;
  /** 操作不可能であるか否か、trueで操作不可能 */
  disabled: boolean;
};
