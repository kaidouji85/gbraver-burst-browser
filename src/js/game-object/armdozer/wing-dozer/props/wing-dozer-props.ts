import { WingDozerModel } from "../model/wing-dozer-model";
import { WingDozerSounds } from "../sounds/wing-dozer-sounds";
import { WingDozerView } from "../view/wing-dozer-view";

/** ウィングドーザ プロパティ */
export type WingDozerProps = {
  /** モデル */
  model: WingDozerModel;
  /** ビュー */
  view: WingDozerView;
  /** サウンド */
  sounds: WingDozerSounds;
};
