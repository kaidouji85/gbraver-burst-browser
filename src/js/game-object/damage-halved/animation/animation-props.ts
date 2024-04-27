import { SEPlayerContainer } from "../../../se/se-player";
import { DamageHalvedModel } from "../model/damage-halved-model";
import { DamageHalvedSounds } from "../sounds/damage-halved-sounds";

/** ダメージ半減 アニメーション プロパティ */
export type DamageHalvedAnimationProps = SEPlayerContainer & {
  /** モデル */
  model: DamageHalvedModel;
  /** サウンド */
  sounds: DamageHalvedSounds;
};
