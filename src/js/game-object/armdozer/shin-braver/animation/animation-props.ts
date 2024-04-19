import { SEPlayerContainer } from "../../../../se/se-player";
import { ShinBraverModel } from "../model/shin-braver-model";
import { ShinBraverSounds } from "../sounds/shin-braver-sounds";

/** シンブレイバー アニメーション プロパティ */
export type ShinBraverAnimationProps = SEPlayerContainer & {
  /** モデル */
  model: ShinBraverModel;
  /** サウンド */
  sounds: ShinBraverSounds;
};
