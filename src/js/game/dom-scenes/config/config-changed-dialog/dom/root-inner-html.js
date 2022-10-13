// @flow
import type {Resources} from "../../../../../resource";
import {PathIds} from "../../../../../resource/path";
import {ROOT_CLASS} from "./class-name";
import type {DataIDs} from "./data-ids";

/**
 * ルート要素のinnerHTML
 *
 * @param resources リソース管理オブジェクト
 * @param ids data-idを集めたもの
 * @return innerHTML
 */
export function rootInnerHTML(resources: Resources, ids: DataIDs): string {
  const closerPath = resources.paths.find(v => v.id === PathIds.CLOSER)?.path ?? '';
  return `
    <div class="${ROOT_CLASS}__background" data-id="${ids.backGround}"></div>
    <div class="${ROOT_CLASS}__dialog">
      <img class="${ROOT_CLASS}__closer" alt="閉じる" src="${closerPath}" data-id="${ids.closer}">
      <span class="${ROOT_CLASS}__caption">設定が変更されています</span>
      <div class="${ROOT_CLASS}__controllers">
        <button class="${ROOT_CLASS}__discard" data-id="${ids.discard}">設定変更を破棄</button>
        <button class="${ROOT_CLASS}__accept" data-id="${ids.accept}">この設定にする</button>
      </div>
    </div>
  `;
}