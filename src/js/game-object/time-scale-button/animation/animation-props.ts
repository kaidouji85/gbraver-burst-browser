import { SEPlayer } from "../../../se/se-player";
import { TimeScaleButtonModel } from "../model/time-scale-button-model";
import { TimeScaleButtonSounds } from "../sounds/time-scale-sounds";

/** タイムスケールボタン アニメーション プロパティ */
export type TimeScaleAnimationProps = {
  /** モデル */
  model: TimeScaleButtonModel;
  /** 効果音 */
  sounds: TimeScaleButtonSounds;
  /** SE再生オブジェクト */
  se: SEPlayer;
};
