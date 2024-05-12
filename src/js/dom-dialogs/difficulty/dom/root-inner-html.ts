import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";
import template from "./root-inner-html.hbs";

/**
 * ルート要素のinnerHTML
 *
 * @param resources リソース管理オブジェクト
 * @param ids data-idを集めたもの
 * @returns innerHTML
 */
export function rootInnerHTML(resources: Resources, ids: DataIDs): string {
  const closerPath =
    resources.paths.find((v) => v.id === PathIds.CLOSER)?.path ?? "";
  const easyIconPath =
    resources.paths.find((v) => v.id === PathIds.NPC_COURSE_EASY_ICON)?.path ??
    "";
  const normalIconPath =
    resources.paths.find((v) => v.id === PathIds.NPC_COURSE_NORMAL_ICON)
      ?.path ?? "";
  const hardIconPath =
    resources.paths.find((v) => v.id === PathIds.NPC_COURSE_HARD_ICON)?.path ??
    "";
  const veryHardIconPath =
    resources.paths.find((v) => v.id === PathIds.NPC_COURSE_VERY_HARD_ICON)
      ?.path ?? "";
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
