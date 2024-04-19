import { SoundResource } from "../../../resource/sound/resource";
import { SEPlayerContainer } from "../../../se/se-player";
import { BurstButtonModel } from "../model/burst-button-model";

/** バーストボタン アニメーション プロパティ */
export type BurstButtonAnimationProps = SEPlayerContainer & {
  /** モデル */
  model: BurstButtonModel;
  /** 効果音 ボタン押下 */
  pushButtonSound: SoundResource;
};
