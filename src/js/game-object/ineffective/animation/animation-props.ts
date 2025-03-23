import { SEPlayerContainer } from "../../../se/se-player";
import { IneffectiveModel } from "../model/ineffective-model";
import { IneffectiveUpSounds } from "../sounds/ineffective-up-sounds";

/** 効果無効 アニメーション プロパティ */
export type IneffectiveAnimationProps = SEPlayerContainer & {
  /** モデル */
  model: IneffectiveModel;
  /** サウンド */
  sounds: IneffectiveUpSounds;
};
