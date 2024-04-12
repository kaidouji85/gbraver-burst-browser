import * as TWEEN from "@tweenjs/tween.js";

import { LightningBarrierAnimationProps } from "../animation/animation-props";
import { LightningBarrierView } from "../view/lightning-barrier-view";

/** 電撃バリア プロパティ */
export type LightningBarrierProps = LightningBarrierAnimationProps & {
  /** ビュー */
  view: LightningBarrierView;
  /** TWEENグループ */
  tweenGroup: TWEEN.Group;
};
