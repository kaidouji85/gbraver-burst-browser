import { PilotButtonModel } from "../model/pilot-button-model";
import { PilotButtonSounds } from "../sounds/pilot-button-sounds";

/** パイロットボタン アニメーション プロパティ */
export type PilotButtonAnimationProps = {
  /** モデル */
  model: PilotButtonModel;
  /** 効果音 */
  sounds: PilotButtonSounds;
};
