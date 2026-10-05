import { SEPlayerContainer } from "../../../../../sounds/se/se-player";
import { ShinyaModel } from "../model/shinya-model";
import { ShinyaSounds } from "../sounds/shinya-sounds";

/** シンヤ カットイン アニメーション プロパティ */
export type ShinyaCutInAnimationProps = SEPlayerContainer & {
  /** モデル */
  model: ShinyaModel;
  /** サウンド */
  sounds: ShinyaSounds;
};
