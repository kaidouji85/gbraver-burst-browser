import { SEPlayer } from "../../../se/se-player";
import { PowerUpModel } from "../model/power-up-model";
import { PowerUpSounds } from "../sounds/power-up-sounds";

/** パワーアップ アニメーション プロパティ */
export type PowerUpAnimationProps = {
  /** モデル */
  model: PowerUpModel;
  /** サウンド */
  sounds: PowerUpSounds;
  /** 効果音再生オブジェクト */
  se: SEPlayer;
};
