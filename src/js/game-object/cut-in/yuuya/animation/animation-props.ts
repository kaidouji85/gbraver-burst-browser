import { SEPlayer } from "../../../../se/se-player";
import { YuuyaModel } from "../model/yuuya-model";
import { YuuyaSounds } from "../sounds/yuuya-sounds";

/** ユウヤ カットイン アニメーション プロパティ */
export type YuuyaCutInAnimationProps = {
  /** モデル */
  model: YuuyaModel;
  /** 効果音 */
  sounds: YuuyaSounds;
  /** SE再生オブジェクト */
  se: SEPlayer;
};
