import { GaiCutInAnimationProps } from "../animation/animation-props";
import { GaiView } from "../view/gai-view";

/** ガイ カットイン プロパティ */
export type GaiCutInProps = GaiCutInAnimationProps & {
  /** ビュー */
  view: GaiView;
};
