import { SEPlayerContainer } from "../../../../se/se-player";
import { GranDozerModel } from "../model/gran-dozer-model";
import { GranDozerSounds } from "../sounds/gran-dozer-sounds";

/** グランドーザのアニメーションで利用するプロパティ */
export type GranDozerAnimationProps = SEPlayerContainer & {
  /** モデル */
  model: GranDozerModel;
  /** 効果音 */
  sounds: GranDozerSounds;
};
