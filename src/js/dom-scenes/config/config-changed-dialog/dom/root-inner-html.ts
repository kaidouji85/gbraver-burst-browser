import type { Resources } from "../../../../resource";
import { PathIds } from "../../../../resource/path/ids";
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
  const caption = "この設定にしますか、それとも設定変更を破棄しますか？";
  return `
    <div class="${ROOT_CLASS}__background" data-id="${ids.backGround}"></div>
    <div class="${ROOT_CLASS}__dialog">
      <img class="${ROOT_CLASS}__closer" alt="閉じる" src="${closerPath}" data-id="${ids.closer}">
      <div class="${ROOT_CLASS}__title">設定が変更されています</div>
      <span class="${ROOT_CLASS}__caption">${caption}</span>
      <button class="${ROOT_CLASS}__accept" data-id="${ids.accept}">この設定にする</button>
      <button class="${ROOT_CLASS}__discard" data-id="${ids.discard}">設定変更を破棄</button>
    </div>
  `;
}
