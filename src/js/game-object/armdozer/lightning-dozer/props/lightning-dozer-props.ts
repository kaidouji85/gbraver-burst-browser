import { LightningDozerModel } from "../model/lightning-dozer-model";
import { LightningDozerSounds } from "../sounds/lightning-dozer-sounds";
import { LightningDozerView } from "../view/lightning-dozer-view";

/** ライトニングドーザのプロパティ */
export type LightningDozerProps = {
  /** モデル */
  model: LightningDozerModel;
  /** ビュー */
  view: LightningDozerView;
  /** サウンド */
  sounds: LightningDozerSounds;
};
