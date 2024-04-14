import { PowerUpModel } from "../model/power-up-model";
import { PowerUpSounds } from "../sounds/power-up-sounds";
import { PowerUpView } from "../view/power-up-view";

/** 攻撃アップ プロパティ */
export type PowerUpProps = {
  /** モデル */
  model: PowerUpModel;
  /** ビュー */
  view: PowerUpView;
  /** サウンド */
  sounds: PowerUpSounds;
};
