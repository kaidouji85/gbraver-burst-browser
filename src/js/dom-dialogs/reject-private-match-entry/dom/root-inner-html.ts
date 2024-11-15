import { wbr } from "../../../dom/wbr";
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
export function rootInnerHTML(resources: Resources, ids: DataIDs) {
  const closerPath =
    resources.paths.find((v) => v.id === PathIds.CLOSER)?.path ?? "";
  const description =
    "ホストに連絡して、ルームを既に破棄していないか、先にマッチメイクしたプレイヤーがいないかを、確認してください。";
  return `
    <div class="${ROOT_CLASS}__background" data-id="${ids.background}"></div>
    <div class="${ROOT_CLASS}__dialog">
      <img class="${ROOT_CLASS}__closer" src="${closerPath}" alt="閉じる" data-id="${ids.closer}">
      <div class="${ROOT_CLASS}__title">マッチメイクに${wbr}失敗しました。</div>
      <div class="${ROOT_CLASS}__description">${description}</div>
      <button class="${ROOT_CLASS}__close-dialog" data-id="${ids.closeButton}">閉じる</button>
    </div>
  `;
}
