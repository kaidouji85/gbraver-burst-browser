import { StatusIconAnimationProps } from "../animation/animation-props";
import { StatusIconView } from "../view/status-icon-view";

/** ステータスアイコンのプロパティ */
export type StatusIconProps = StatusIconAnimationProps & {
  /** ステータスアイコンのビュー */
  view: StatusIconView;
};
