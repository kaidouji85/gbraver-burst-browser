import { LightningModel } from "../model/lightning-model";
import { LightningSounds } from "../sounds/lightning-sounds";
import { LightningView } from "../view/lightning-view";

/** 電撃ヒットマーク プロパティ */
export type LightningProps = {
  /** モデル */
  model: LightningModel;
  /** ビュー */
  view: LightningView;
  /** サウンド */
  sounds: LightningSounds;
};
