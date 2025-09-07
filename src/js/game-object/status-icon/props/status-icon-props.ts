import { StatusIconModel } from "../model/status-icon-model";
import { StatusIconView } from "../view/status-icon-view";

/** ステータスアイコンのプロパティ */
export type StatusIconProps = {
  /** ステータスアイコンのモデル */
  model: StatusIconModel;
  /** ステータスアイコンのビュー */
  view: StatusIconView;
};
