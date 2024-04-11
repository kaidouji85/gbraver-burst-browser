import { GenesisBraverModel } from "../model/genesis-braver-model";
import { GenesisBraverSounds } from "../sounds/genesis-braver-sounds";
import { GenesisBraverView } from "../view/genesis-braver-view";

/** ジェネシスブレイバーのプロパティ */
export type GenesisBraverProps = {
  /** ビュー */
  view: GenesisBraverView;
  /** 効果音 */
  sounds: GenesisBraverSounds;
  /** モデル */
  model: GenesisBraverModel;
};
