import { ShinyaCutInAnimationProps } from "../animation/animation-props";
import { ShinyaView } from "../view/shinya-view";

/** シンヤ カットイン プロパティ */
export type ShinyaCutInProps = ShinyaCutInAnimationProps & {
  /** ビュー */
  view: ShinyaView;
};
