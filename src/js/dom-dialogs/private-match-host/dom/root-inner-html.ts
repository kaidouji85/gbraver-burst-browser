import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @param resources リソース管理オブジェクト
 * @param ids data-idをあつめたもの
 * @param roomID 表示するルームID
 * @returns 生成結果
 */
export function rootInnerHTML(
  resources: Resources,
  ids: DataIDs,
  roomID: string,
): string {
  const closerPath =
    resources.paths.find((v) => v.id === PathIds.CLOSER)?.path ?? "";
  const description =
    "プライベートマッチしたい人に、以下のルームIDを共有してください。";
  return `
    <div class="${ROOT_CLASS}__background"></div>
    <div class="${ROOT_CLASS}__dialog">
      <img class="${ROOT_CLASS}__closer" alt="閉じる" src="${closerPath}" data-id="${ids.closer}">
      <div class="${ROOT_CLASS}__title">プライベートマッチ（ホスト）</div>
      <div class="${ROOT_CLASS}__description">${description}</div>
      <div class="${ROOT_CLASS}__room-id">${roomID}</div>
    </div>
  `;
}
