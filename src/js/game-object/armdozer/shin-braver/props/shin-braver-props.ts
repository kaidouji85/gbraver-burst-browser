import { ShinBraverAnimationProps } from "../animation/animation-props";
import { ShinBraverView } from "../view/shin-braver-view";

/** シンブレイバー プロパティ */
export type ShinBraverProps = ShinBraverAnimationProps & {
  /** ビュー */
  view: ShinBraverView;
};
