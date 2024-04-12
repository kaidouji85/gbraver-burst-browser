import { LightningBarrierModel } from "../model/lightning-barrier-model";
import { LightningBarrierSounds } from "../sounds/lightning-barrier-sounds";

/** 電撃バリア アニメーション プロパティ */
export type LightningBarrierAnimationProps = {
  /** モデル */
  model: LightningBarrierModel;
  /** 効果音 */
  sounds: LightningBarrierSounds;
};
