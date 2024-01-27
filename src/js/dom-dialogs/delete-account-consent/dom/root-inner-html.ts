import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT_CLASS } from "./class-name";
import template from "./root-inner-html.hbs";

/**
 * ルート要素のinnerHTMLを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function rootInnerHTML(resources: Resources): string {
  const closerPath =
    resources.paths.find((v) => v.id === PathIds.CLOSER)?.path ?? "";
  const caption =
    "アカウント削除をすると、ネット対戦が出来なくなります。本当にアカウント削除しますか？";
  return template({
    ROOT_CLASS,
    closerPath,
    caption,
  });
}
