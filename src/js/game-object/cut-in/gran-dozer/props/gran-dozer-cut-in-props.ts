import { GranDozerCutInAnimationProps } from "../animation/animation-props";
import { GranDozerCutInView } from "../view/gran-dozer-cut-in-view";

/** グランドーザ カットイン プロパティ */
export type GranDozerCutInProps = GranDozerCutInAnimationProps & {
  /** ビュー */
  view: GranDozerCutInView;
};
