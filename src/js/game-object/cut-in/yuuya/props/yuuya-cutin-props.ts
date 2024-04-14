import { YuuyaCutInAnimationProps } from "../animation/animation-props";
import { YuuyaView } from "../view/yuuya-view";

/** ユウヤ カットイン プロパティ */
export type YuuyaCutInProps = YuuyaCutInAnimationProps & {
  /** ビュー */
  view: YuuyaView;
};
