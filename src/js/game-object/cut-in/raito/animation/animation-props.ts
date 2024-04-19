import { SEPlayerContainer } from "../../../../se/se-player";
import { RaitoModel } from "../model/raito-model";
import { RaitoSounds } from "../sounds/raito-sounds";

/** ライト カットイン アニメーションプロパティ */
export type RaitoCutInAnimationProps = SEPlayerContainer & {
  /** モデル */
  model: RaitoModel;
  /** 効果音 */
  sounds: RaitoSounds;
};
