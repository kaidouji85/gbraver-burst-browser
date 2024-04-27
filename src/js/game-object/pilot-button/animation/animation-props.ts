import { SEPlayerContainer } from "../../../se/se-player";
import { PilotButtonModel } from "../model/pilot-button-model";
import { PilotButtonSounds } from "../sounds/pilot-button-sounds";

/** パイロットボタン アニメーション プロパティ */
export type PilotButtonAnimationProps = SEPlayerContainer & {
  /** モデル */
  model: PilotButtonModel;
  /** 効果音 */
  sounds: PilotButtonSounds;
};
