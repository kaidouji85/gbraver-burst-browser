import { ShinBraverModel } from "../model/shin-braver-model";
import { ShinBraverSounds } from "../sounds/shin-braver-sounds";
import { ShinBraverView } from "../view/shin-braver-view";

/** シンブレイバー プロパティ */
export type ShinBraverProps = {
  /** モデル */
  model: ShinBraverModel;
  /** ビュー */
  view: ShinBraverView;
  /** サウンド */
  sounds: ShinBraverSounds;
};
