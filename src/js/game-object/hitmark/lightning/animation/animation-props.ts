import { LightningModel } from "../model/lightning-model";
import { LightningSounds } from "../sounds/lightning-sounds";

/** 電撃ヒットマーク アニメーション プロパティ */
export type LightningAnimationProps = {
  /** モデル */
  model: LightningModel;
  /** サウンド */
  sounds: LightningSounds;
};
