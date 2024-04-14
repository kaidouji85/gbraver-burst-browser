import { ShinyaModel } from "../model/shinya-model";
import { ShinyaSounds } from "../sounds/shinya-sounds";

/** シンヤ カットイン アニメーション プロパティ */
export type ShinyaCutInAnimationProps = {
  /** モデル */
  model: ShinyaModel;
  /** サウンド */
  sounds: ShinyaSounds;
};
