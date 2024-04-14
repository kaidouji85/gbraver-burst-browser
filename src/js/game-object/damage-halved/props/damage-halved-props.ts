import { DamageHalvedModel } from "../model/damage-halved-model";
import { DamageHalvedSounds } from "../sounds/damage-halved-sounds";
import { DamageHalvedView } from "../view/damage-halved-view";

/** ダメージ半減 プロパティ */
export type DamageHalvedProps = {
  /** モデル */
  model: DamageHalvedModel;
  /** ビュー */
  view: DamageHalvedView;
  /** サウンド */
  sounds: DamageHalvedSounds;
};
