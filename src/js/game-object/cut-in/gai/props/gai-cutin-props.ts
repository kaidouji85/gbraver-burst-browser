import { GaiModel } from "../model/gai-model";
import { GaiSounds } from "../sounds/gai-sounds";
import { GaiView } from "../view/gai-view";

/** ガイ カットイン プロパティ */
export type GaiCutInProps = {
  /** モデル */
  model: GaiModel;
  /** ビュー */
  view: GaiView;
  /** 効果音 */
  sounds: GaiSounds;
};
