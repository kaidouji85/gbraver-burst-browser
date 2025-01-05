import { SoundResource } from "../../../../resource/sound/resource";
import { ShockWaveModel } from "../model/shock-wave-model";

/** アニメーションプロパティ */
export type ShockWaveAnimationProps = {
  /** モデル */
  model: ShockWaveModel;
  /** ヒット音 */
  hitSound: SoundResource;
};
