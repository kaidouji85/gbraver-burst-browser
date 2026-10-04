import { WingDozerCutInAnimationProps } from "../animation/animation-props";
import { WingDozerCutInView } from "../view/wing-dozer-cutin-view";

/** ウィングドーザ カットイン プロパティ */
export type WingDozerCutInProps = WingDozerCutInAnimationProps & {
  /** ビュー */
  view: WingDozerCutInView;
};
