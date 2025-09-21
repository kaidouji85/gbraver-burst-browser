import { SEPlayerContainer } from "../../../se/se-player";
import { PredicatedDamageModel } from "../model/predicated-damage-model";
import { PredicatedDamageSounds } from "../sounds/predicated-damage-sounds";

/** ダメージ予想 アニメーション プロパティ */
export type PredicatedDamageAnimationProps = SEPlayerContainer & {
  /** モデル */
  model: PredicatedDamageModel;
  /** サウンド */
  sounds: PredicatedDamageSounds;
};
