import { WingDozerModel } from "../model/wing-dozer-model";
import { WingDozerSounds } from "../sounds/wing-dozer-sounds";

/** ウィングドーザ アニメーションプロパティ */
export type WingDozerAnimationProps = {
  /** モデル */
  model: WingDozerModel;
  /** サウンド */
  sounds: WingDozerSounds;
};
