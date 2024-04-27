import { SEPlayerContainer } from "../../../../se/se-player";
import { WingDozerModel } from "../model/wing-dozer-model";
import { WingDozerSounds } from "../sounds/wing-dozer-sounds";

/** ウィングドーザ アニメーションプロパティ */
export type WingDozerAnimationProps = SEPlayerContainer & {
  /** モデル */
  model: WingDozerModel;
  /** サウンド */
  sounds: WingDozerSounds;
};
