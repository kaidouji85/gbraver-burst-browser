import { LightningShotModel } from "../model/lightning-shot-model";
import { LightningShotSounds } from "../sounds/lightning-shot-sounds";

/** 電撃ショットのアニメーションプロパティ */
export type LightningShotAnimationProps = {
  /** モデル */
  model: LightningShotModel;
  /** サウンド */
  readonly sounds: LightningShotSounds;
};
