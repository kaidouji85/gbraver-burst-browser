import { SEPlayerContainer } from "../../../../se/se-player";
import { YuuyaModel } from "../model/yuuya-model";
import { YuuyaSounds } from "../sounds/yuuya-sounds";

/** ユウヤ カットイン アニメーション プロパティ */
export type YuuyaCutInAnimationProps = SEPlayerContainer & {
  /** モデル */
  model: YuuyaModel;
  /** 効果音 */
  sounds: YuuyaSounds;
};
