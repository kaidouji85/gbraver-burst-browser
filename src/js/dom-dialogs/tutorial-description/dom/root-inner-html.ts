import { ResourcesContainer } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT } from "./class-name";
import template from "./root-inner-html.hbs";

/** ルート要素のオプション */
export type RootInnerHTMLOptions = ResourcesContainer;

/**
 * ルート要素のinnerHTMLを生成する
 * @returns ルート要素のinnerHTML
 */
export function rootInnerHTML(options: RootInnerHTMLOptions): string {
  const { resources } = options;
  const closerPath =
    resources.paths.find((p) => p.id === PathIds.CLOSER)?.path ?? "";
  return template({
    ROOT,
    closerPath,
  });
}
