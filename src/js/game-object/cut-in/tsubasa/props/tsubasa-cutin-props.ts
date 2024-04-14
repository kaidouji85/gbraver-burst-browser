import { TsubasaCutInAnimationProps } from "../animation/animation-props";
import { TsubasaView } from "../view/tsubasa-view";

/** ツバサ カットイン プロパティ */
export type TsubasaCutInProps = TsubasaCutInAnimationProps & {
  /** ビュー */
  view: TsubasaView;
};
