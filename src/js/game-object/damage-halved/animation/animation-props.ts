import { DamageHalvedModel } from "../model/damage-halved-model";
import { DamageHalvedSounds } from "../sounds/damage-halved-sounds";
import {SEPlayer} from "../../../se/se-player";

/** ダメージ半減 アニメーション プロパティ */
export type DamageHalvedAnimationProps = {
  /** モデル */
  model: DamageHalvedModel;
  /** サウンド */
  sounds: DamageHalvedSounds;
  /** SE再生オブジェクト */
  se: SEPlayer;
};
