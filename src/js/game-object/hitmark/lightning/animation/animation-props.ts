import { SEPlayerContainer } from "../../../../se/se-player";
import { LightningModel } from "../model/lightning-model";
import { LightningSounds } from "../sounds/lightning-sounds";

/** 電撃ヒットマーク アニメーション プロパティ */
export type LightningAnimationProps = SEPlayerContainer & {
  /** モデル */
  model: LightningModel;
  /** サウンド */
  sounds: LightningSounds;
};
