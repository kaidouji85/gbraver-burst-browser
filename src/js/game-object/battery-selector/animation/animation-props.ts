import { SEPlayer } from "../../../se/se-player";
import { BatterySelectorModel } from "../model";
import { BatterySelectorSounds } from "../sounds/battery-selector-sounds";

/** バッテリーセレクタ アニメーション プロパティ */
export type BatterySelectorAnimationProps = {
  /** モデル */
  model: BatterySelectorModel;
  /** 効果音 */
  sounds: BatterySelectorSounds;
  /** 効果音再生オブジェクト */
  se: SEPlayer;
};
