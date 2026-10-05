import { GranDozerAnimationProps } from "../animation/animation-props";
import { GranDozerView } from "../view/gran-dozer-view";

/** グランドーザのプロパティ */
export type GranDozerProps = GranDozerAnimationProps & {
  /** ビュー */
  view: GranDozerView;
};
