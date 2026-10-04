import { RaitoCutInAnimationProps } from "../animation/animation-props";
import { RaitoView } from "../view/raito-view";

/** ライト カットイン プロパティ */
export type RaitoCutInProps = RaitoCutInAnimationProps & {
  /** ビュー */
  view: RaitoView;
};
