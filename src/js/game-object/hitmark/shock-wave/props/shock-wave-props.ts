import { SoundResource } from "../../../../resource/sound/resource";
import { ShockWaveModel } from "../model/shock-wave-model";
import { ShockWaveView } from "../view/shock-wave-view";

/** 衝撃波 プロパティ */
export type ShockWaveProps = {
  /** モデル */
  model: ShockWaveModel;
  /** ビュー */
  view: ShockWaveView;
  /** ヒット音 */
  hitSound: SoundResource;
};
