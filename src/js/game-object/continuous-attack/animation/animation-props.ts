import { SEPlayer } from "../../../se/se-player";
import { ContinuousAttackModel } from "../model/continuous-attack-model";
import { ContinuousAttackSounds } from "../sounds/continuous-attack-sounds";

/** 連続攻撃 アニメーションプロパティ */
export type ContinuousAttackAnimationProps = {
  /** モデル */
  model: ContinuousAttackModel;
  /** サウンド */
  sounds: ContinuousAttackSounds;
  /** SE再生オブジェクト */
  se: SEPlayer;
};
