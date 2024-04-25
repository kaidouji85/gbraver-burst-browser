import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @param resources リソース管理オブジェクト
 * @param ids data-idをあつめたもの
 * @returns 生成結果
 */
export function rootInnerHtml(resources: Resources, ids: DataIDs): string {
  const closerPath =
    resources.paths.find((v) => v.id === PathIds.CLOSER)?.path ?? "";
  const entryDescription = "ホストから共有されたルームIDを、入力してください。";
  return `
    <div class="${ROOT_CLASS}__background"></div>
    <div class="${ROOT_CLASS}__dialog">
      <img class="${ROOT_CLASS}__closer" alt="閉じる" src="${closerPath}" data-id="${ids.closer}">
      <div class="${ROOT_CLASS}__entry-title">プライベートマッチ（ゲスト）</div>
      <div class="${ROOT_CLASS}__entry-description">${entryDescription}</div>
      <input class="${ROOT_CLASS}__room-id" type="text" data-id="${ids.roomID}">
      <button class="${ROOT_CLASS}__enter" data-id="${ids.enterButton}">プライベートマッチ開始</button>
    </div>
  `;
}
