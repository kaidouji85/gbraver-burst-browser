import { PowerUpModel } from "../model/power-up-model";
import { PowerUpSounds } from "../sounds/power-up-sounds";
import {SEPlayer} from "../../../se/se-player";

/** パワーアップ アニメーション プロパティ */
export type PowerUpAnimationProps = {
  /** モデル */
  model: PowerUpModel;
  /** サウンド */
  sounds: PowerUpSounds;
  /** 効果音再生オブジェクト */
  se: SEPlayer;
};
