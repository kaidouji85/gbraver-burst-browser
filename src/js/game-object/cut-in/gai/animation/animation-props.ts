import { GaiModel } from "../model/gai-model";
import { GaiSounds } from "../sounds/gai-sounds";

/** ガイ カットイン アニメーションプロパティ */
export type GaiCutInAnimationProps = {
  /** モデル */
  model: GaiModel;
  /** 効果音 */
  sounds: GaiSounds;
};
