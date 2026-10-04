import { LightningDozerCutInAnimationProps } from "../animation/animation-props";
import { LightningDozerCutInView } from "../view/lightning-dozer-cutin-view";

/** ライトニングドーザ カットイン プロパティ */
export type LightningDozerCutInProps = LightningDozerCutInAnimationProps & {
  /** ビュー */
  view: LightningDozerCutInView;
};
