import { WingDozerAnimationProps } from "../animation/animation-props";
import { WingDozerView } from "../view/wing-dozer-view";

/** ウィングドーザ プロパティ */
export type WingDozerProps = WingDozerAnimationProps & {
  /** ビュー */
  view: WingDozerView;
};
