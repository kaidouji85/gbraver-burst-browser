import { StatusIconAnimationProps } from "../animation/animation-props";
import { StatusIconView } from "../view/status-icon-view";

/** ステータスアイコンのプロパティ */
export type StatusIconProps = StatusIconAnimationProps & {
  /** ステータスアイコンのビュー */
  view: StatusIconView;
  /** 操作不可能であるか否か、trueで操作不可能 */
  disabled: boolean;
};
