import { SEPlayerContainer } from "../../../se/se-player";
import { PowerUpModel } from "../model/power-up-model";
import { PowerUpSounds } from "../sounds/power-up-sounds";

/** パワーアップ アニメーション プロパティ */
export type PowerUpAnimationProps = SEPlayerContainer & {
  /** モデル */
  model: PowerUpModel;
  /** サウンド */
  sounds: PowerUpSounds;
};
