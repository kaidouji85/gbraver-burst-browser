import { TsubasaModel } from "../model/tsubasa-model";
import { TsubasaSounds } from "../sounds/tsubasa-sounds";
import { TsubasaView } from "../view/tsubasa-view";

/** ツバサ カットイン プロパティ */
export type TsubasaCutInProps = {
  /** モデル */
  model: TsubasaModel;
  /** ビュー */
  view: TsubasaView;
  /** サウンド */
  sounds: TsubasaSounds;
};
