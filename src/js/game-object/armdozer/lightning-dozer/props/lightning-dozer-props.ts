import { LightningDozerAnimationProps } from "../animation/animation-props";
import { LightningDozerView } from "../view/lightning-dozer-view";

/** ライトニングドーザのプロパティ */
export type LightningDozerProps = LightningDozerAnimationProps & {
  /** ビュー */
  view: LightningDozerView;
};
