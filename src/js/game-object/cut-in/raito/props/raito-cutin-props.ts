import { RaitoModel } from "../model/raito-model";
import { RaitoSounds } from "../sounds/raito-sounds";
import { RaitoView } from "../view/raito-view";

/** ライト カットイン プロパティ */
export type RaitoCutInProps = {
  /** モデル */
  model: RaitoModel;
  /** ビュー */
  view: RaitoView;
  /** 効果音 */
  sounds: RaitoSounds;
};
