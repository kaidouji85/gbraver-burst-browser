import { ResourcesContainer } from "../../../resource";
import { createInitialModel } from "../model/create-initial-model";
import { StatusIconView } from "../view/status-icon-view";
import { StatusIconProps } from "./status-icon-props";

/** プロパティ生成オプション */
export type StatusIconPropsCreatorOptions = ResourcesContainer;

/**
 * ステータスアイコンのプロパティを生成する
 * @param options プロパティ生成オプション
 * @returns ステータスアイコンのプロパティ
 */
export function createStatusIconProps(
  options: StatusIconPropsCreatorOptions,
): StatusIconProps {
  const model = createInitialModel();
  const view = new StatusIconView(options);
  return { model, view };
}
