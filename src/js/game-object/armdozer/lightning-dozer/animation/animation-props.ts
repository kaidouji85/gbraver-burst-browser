import { LightningDozerModel } from "../model/lightning-dozer-model";
import { LightningDozerSounds } from "../sounds/lightning-dozer-sounds";
import {SEPlayer} from "../../../../se/se-player";

/** ライトニングドーザ アニメーション プロパティ */
export type LightningDozerAnimationProps = {
  /** モデル */
  model: LightningDozerModel;
  /** サウンド */
  sounds: LightningDozerSounds;
  /** SE再生 */
  se: SEPlayer;
};
