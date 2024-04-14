import { YuuyaModel } from "../model/yuuya-model";
import { YuuyaSounds } from "../sounds/yuuya-sounds";
import { YuuyaView } from "../view/yuuya-view";

/** ユウヤ カットイン プロパティ */
export type YuuyaCutInProps = {
  /** モデル */
  model: YuuyaModel;
  /** ビュー */
  view: YuuyaView;
  /** 効果音 */
  sounds: YuuyaSounds;
};
