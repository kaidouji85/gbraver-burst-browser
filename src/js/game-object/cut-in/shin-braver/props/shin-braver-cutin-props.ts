import { ShinBraverCutInAnimationProps } from "../animation/animation-props";
import { ShinBraverCutInView } from "../view/shin-braver-cutin-view";

/** シンブレイバーカットイン プロパティ */
export type ShinBraverCutInProps = ShinBraverCutInAnimationProps & {
  /** ビュー */
  view: ShinBraverCutInView;
};
