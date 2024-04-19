import { SEPlayerContainer } from "../../../se/se-player";
import { BatterySelectorModel } from "../model";
import { BatterySelectorSounds } from "../sounds/battery-selector-sounds";

/** バッテリーセレクタ アニメーション プロパティ */
export type BatterySelectorAnimationProps = SEPlayerContainer & {
  /** モデル */
  model: BatterySelectorModel;
  /** 効果音 */
  sounds: BatterySelectorSounds;
};
