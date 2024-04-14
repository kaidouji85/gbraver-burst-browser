import { WingDozerModel } from "../model/wing-dozer-model";
import { WingDozerSounds } from "../sounds/wing-dozer-sounds";
import {SEPlayer} from "../../../../se/se-player";

/** ウィングドーザ アニメーションプロパティ */
export type WingDozerAnimationProps = {
  /** モデル */
  model: WingDozerModel;
  /** サウンド */
  sounds: WingDozerSounds;
  /** SE再生 */
  se: SEPlayer;
};
