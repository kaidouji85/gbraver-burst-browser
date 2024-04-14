import { LightningAnimationProps } from "../animation/animation-props";
import { LightningView } from "../view/lightning-view";

/** 電撃ヒットマーク プロパティ */
export type LightningProps = LightningAnimationProps & {
  /** ビュー */
  view: LightningView;
};
