import { ShinBraverModel } from "../model/shin-braver-model";
import { ShinBraverSounds } from "../sounds/shin-braver-sounds";

/** シンブレイバー アニメーション プロパティ */
export type ShinBraverAnimationProps = {
  /** モデル */
  model: ShinBraverModel;
  /** サウンド */
  sounds: ShinBraverSounds;
};
