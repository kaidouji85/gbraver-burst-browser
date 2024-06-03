import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { PathId } from "../../../resource/path/resource";
import { ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";
import template from "./root-inner-html.hbs";

/**
 * リソースからパスを取得するヘルパー関数
 * 見つからない場合は空文字を返す
 * @param resources リソース管理オブジェクト
 * @param id パスID
 * @returns 取得したパス
 */
const findPathOrEmpty = (resources: Resources, id: PathId) =>
  resources.paths.find((v) => v.id === id)?.path ?? "";

/**
 * ルート要素のinnerHTML
 * @param resources リソース管理オブジェクト
 * @param ids data-idを集めたもの
 * @returns innerHTML
 */
export function rootInnerHTML(resources: Resources, ids: DataIDs): string {
  const closerPath = findPathOrEmpty(resources, PathIds.CLOSER);
  const easyIconPath = findPathOrEmpty(resources, PathIds.NPC_COURSE_EASY_ICON);
  const normalIconPath = findPathOrEmpty(
    resources,
    PathIds.NPC_COURSE_NORMAL_ICON,
  );
  const hardIconPath = findPathOrEmpty(resources, PathIds.NPC_COURSE_HARD_ICON);
  const veryHardIconPath = findPathOrEmpty(
    resources,
    PathIds.NPC_COURSE_VERY_HARD_ICON,
  );
  return template({
    ROOT_CLASS,
    closerPath,
    easyIconPath,
    normalIconPath,
    hardIconPath,
    veryHardIconPath,
    ids,
  });
}
