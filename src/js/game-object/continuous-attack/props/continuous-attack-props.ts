import { ContinuousAttackModel } from "../model/continuous-attack-model";
import { ContinuousAttackSounds } from "../sounds/continuous-attack-sounds";
import { ContinuousAttackView } from "../view/continuous-attack-view";

/** 連続攻撃プロパティ */
export type ContinuousAttackProps = {
  /** モデル */
  model: ContinuousAttackModel;
  /** ビュー */
  view: ContinuousAttackView;
  /** サウンド */
  sounds: ContinuousAttackSounds;
};
