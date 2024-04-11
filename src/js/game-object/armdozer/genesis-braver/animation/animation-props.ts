import { GenesisBraverModel } from "../model/genesis-braver-model";
import { GenesisBraverSounds } from "../sounds/genesis-braver-sounds";

/** ジェネシスブレイバーのアニメーションで利用するプロパティ */
export type GenesisBraverAnimationProps = {
  /** モデル */
  model: GenesisBraverModel;
  /** 効果音 */
  sounds: GenesisBraverSounds;
};
