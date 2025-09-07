import { SEPlayerContainer } from "../../../se/se-player";
import { StatusIconModel } from "../model/status-icon-model";
import { StatusIconSounds } from "../sounds/status-icon-sounds";

/** アニメーションプロパティ */
export type StatusIconAnimationProps = SEPlayerContainer & {
  /** モデル */
  model: StatusIconModel;
  /** サウンド */
  sounds: StatusIconSounds;
};
