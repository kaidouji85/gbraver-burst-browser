import { ShinyaModel } from "../model/shinya-model";
import { ShinyaSounds } from "../sounds/shinya-sounds";
import { ShinyaView } from "../view/shinya-view";

/** シンヤ カットイン プロパティ */
export type ShinyaCutInProps = {
  /** モデル */
  model: ShinyaModel;
  /** ビュー */
  view: ShinyaView;
  /** サウンド */
  sounds: ShinyaSounds;
};
