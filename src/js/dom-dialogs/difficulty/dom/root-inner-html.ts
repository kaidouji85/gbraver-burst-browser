import type { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT_CLASS } from "./class-name";
import type { DataIDs } from "./data-ids";

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
  return `
    <div class="${ROOT_CLASS}__background" data-id="${ids.backGround}"></div>
    <div class="${ROOT_CLASS}__dialog">
      <img class="${ROOT_CLASS}__closer" alt="閉じる" src="${closerPath}" data-id="${ids.closer}">
      <div class="${ROOT_CLASS}__caption">難易度を選択してください</div>
      <div class="${ROOT_CLASS}__controllers">
        <div class="${ROOT_CLASS}__easy" data-id="${ids.easy}">
          <img class="${ROOT_CLASS}__easy-icon" alt="易" src="${easyIconPath}">
          <button class="${ROOT_CLASS}__easy-button" alt="easy-course" data-id="${ids.easyButton}">かんたん</button>
        </div>
        <div class="${ROOT_CLASS}__normal" data-id="${ids.normal}">
          <img class="${ROOT_CLASS}__normal-icon" alt="普" src="${normalIconPath}">
          <button class="${ROOT_CLASS}__normal-button" alt="normal-course" data-id="${ids.normalButton}">ふつう</button>
        </div>
        <div class="${ROOT_CLASS}__hard" data-id="${ids.hard}">
          <img class="${ROOT_CLASS}__hard-icon" alt="難" src="${hardIconPath}">
          <button class="${ROOT_CLASS}__hard-button" alt="hard-course" data-id="${ids.hardButton}">むずい</button>
        </div>
        <div class="${ROOT_CLASS}__very-hard" data-id="${ids.veryHard}">
          <img class="${ROOT_CLASS}__very-hard-icon" alt="檄" src="${veryHardIconPath}">
          <button class="${ROOT_CLASS}__very-hard-button" alt="very-hard-course" data-id="${ids.veryHardButton}">げきむず</button>
        </div>
      </div>
    </div>  
  `;
}
