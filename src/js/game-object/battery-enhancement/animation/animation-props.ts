import { SEPlayerContainer } from "../../../se/se-player";
import { BatteryEnhancementModel } from "../model/battery-enhancement-model";
import { BatteryEnhancementSounds } from "../sounds/battery-enhancement-sounds";

/** バッテリー増強 アニメーションプロパティ */
export type BatteryEnhancementAnimationProps = SEPlayerContainer & {
  /** モデル */
  model: BatteryEnhancementModel;
  /** 効果音 */
  sounds: BatteryEnhancementSounds;
};
