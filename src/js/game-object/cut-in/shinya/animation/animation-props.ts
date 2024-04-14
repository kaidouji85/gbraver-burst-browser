import { ShinyaModel } from "../model/shinya-model";
import { ShinyaSounds } from "../sounds/shinya-sounds";
import {SEPlayer} from "../../../../se/se-player";

/** シンヤ カットイン アニメーション プロパティ */
export type ShinyaCutInAnimationProps = {
  /** モデル */
  model: ShinyaModel;
  /** サウンド */
  sounds: ShinyaSounds;
  /** 効果音再生オブジェクト */
  se: SEPlayer;
};
