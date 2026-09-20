import { ResourcesContainer } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT } from "./class-name";
import template from "./root-inner-html.hbs";

/** ルートHTML inner HTML生成オプション */
export type RootInnerHTMLOptions = ResourcesContainer;

/**
 * ルートHTML要素のinner HTMLを生成する
 * @param options オプション
 * @returns inner HTML
 */
export const rootInnerHTML = (options: RootInnerHTMLOptions) => {
  const { resources } = options;
  const batteryIconPath =
    resources.paths.find((p) => p.id === PathIds.BATTERY_ICON)?.path ?? "";

  return template({
    ROOT,
    batteryIconPath,
  });
};
