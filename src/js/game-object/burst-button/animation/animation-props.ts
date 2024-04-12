import { SoundResource } from "../../../resource/sound/resource";
import { BurstButtonModel } from "../model/burst-button-model";

/** バーストボタン アニメーション プロパティ */
export type BurstButtonAnimationProps = {
  /** モデル */
  model: BurstButtonModel;
  /** 効果音 ボタン押下 */
  pushButtonSound: SoundResource;
};
