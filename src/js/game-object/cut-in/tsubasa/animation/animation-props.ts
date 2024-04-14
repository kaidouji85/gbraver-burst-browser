import { SEPlayer } from "../../../../se/se-player";
import { TsubasaModel } from "../model/tsubasa-model";
import { TsubasaSounds } from "../sounds/tsubasa-sounds";

/** ツバサ カットイン アニメーション プロパティ */
export type TsubasaCutInAnimationProps = {
  /** モデル */
  model: TsubasaModel;
  /** サウンド */
  sounds: TsubasaSounds;
  /** SE再生オブジェクト */
  se: SEPlayer;
};
