import { Resources } from "../../../../resource";
import { PathIds } from "../../../../resource/path/ids";
import { ROOT } from "./class-name";
import template from "./root-inner-html.hbs";

/**
 * ルート要素のinnerHTMLを生成する
 * @param resources リソース管理オブジェクト
 * @returns 生成結果
 */
export function rootInnerHTML(resources: Resources): string {
  const closerPath =
    resources.paths.find((p) => p.id === PathIds.CLOSER)?.path ?? "";
  return template({
    ROOT,
    closerPath,
  });
}
