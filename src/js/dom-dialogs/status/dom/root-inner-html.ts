import { PlayerState } from "gbraver-burst-core";

import { ResourcesContainer } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT } from "./class-name";
import template from "./root-inner-html.hbs";

/** オプション */
export type RootInnerHTMLOptions = ResourcesContainer & {
  /** ダイアログを表示するステート */
  state: PlayerState;
};

/**
 * ルート要素のinnerHTMLを生成する
 * @param options オプション
 * @returns 生成結果
 */
export function rootInnerHTML(options: RootInnerHTMLOptions): string {
  const { resources } = options;
  const { armdozer, pilot } = options.state;
  const closerPath =
    resources.paths.find((p) => p.id === PathIds.CLOSER)?.path ?? "";
  const batteryIconPath =
    resources.paths.find((v) => v.id === PathIds.BATTERY_ICON)?.path ?? "";
  return template({ ROOT, closerPath, batteryIconPath, armdozer, pilot });
}
