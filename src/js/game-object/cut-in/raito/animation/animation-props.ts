import { SEPlayer } from "../../../../se/se-player";
import { RaitoModel } from "../model/raito-model";
import { RaitoSounds } from "../sounds/raito-sounds";

/** ライト カットイン アニメーションプロパティ */
export type RaitoCutInAnimationProps = {
  /** モデル */
  model: RaitoModel;
  /** 効果音 */
  sounds: RaitoSounds;
  /** SE再生オブジェクト */
  se: SEPlayer;
};
