import * as TWEEN from "@tweenjs/tween.js";

import { LightningBarrierModel } from "../model/lightning-barrier-model";
import { LightningBarrierSounds } from "../sounds/lightning-barrier-sounds";
import { LightningBarrierView } from "../view/lightning-barrier-view";

/** 電撃バリア プロパティ */
export type LightningBarrierProps = {
  /** モデル */
  model: LightningBarrierModel;
  /** ビュー */
  view: LightningBarrierView;
  /** 効果音 */
  sounds: LightningBarrierSounds;
  /** TWEENグループ */
  tweenGroup: TWEEN.Group;
};