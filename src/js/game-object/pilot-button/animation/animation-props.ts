import { PilotButtonModel } from "../model/pilot-button-model";
import { PilotButtonSounds } from "../sounds/pilot-button-sounds";
import {SEPlayer} from "../../../se/se-player";

/** パイロットボタン アニメーション プロパティ */
export type PilotButtonAnimationProps = {
  /** モデル */
  model: PilotButtonModel;
  /** 効果音 */
  sounds: PilotButtonSounds;
  /** 効果音再生オブジェクト */
  se: SEPlayer;
};
