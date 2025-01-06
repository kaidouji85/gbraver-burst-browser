import { SoundResource } from "../../../../resource/sound/resource";
import { SEPlayerContainer } from "../../../../se/se-player";
import { ShockWaveModel } from "../model/shock-wave-model";

/** アニメーションプロパティ */
export type ShockWaveAnimationProps = SEPlayerContainer & {
  /** モデル */
  model: ShockWaveModel;
  /** ヒット音 */
  hitSound: SoundResource;
};
