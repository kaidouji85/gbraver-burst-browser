import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path";
import { ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @param resources リソース管理オブジェクト
 * @param ids data-idをあつめたもの
 * @return 生成結果
 */
export function rootInnerHTML(resources: Resources, ids: DataIDs): string {
  const closerPath =
    resources.paths.find((v) => v.id === PathIds.CLOSER)?.path ?? "";
  const casualMatchDescription =
    "すべてのプレイヤーでランダムマッチをおこないます";
  const privateMatchDescription = "合言葉を共有して、知り合いと対戦します";
  return `
    <div class="${ROOT_CLASS}__background" data-id="${ids.backGround}"></div>
    <div class="${ROOT_CLASS}__dialog">
      <img class="${ROOT_CLASS}__closer" alt="閉じる" src="${closerPath}" data-id="${ids.closer}">
      <button class="${ROOT_CLASS}__casual-match" alt="カジュアルマッチをする" data-id="${ids.casualMatchButton}">
        <div class="${ROOT_CLASS}__casual-match-title">カジュアルマッチ</div>
        <div class="${ROOT_CLASS}__casual-match-description">${casualMatchDescription}</div>
      </button>
      <button class="${ROOT_CLASS}__private-match" alt="プライベートマッチをする" data-id="${ids.privateMatchButton}">
        <div class="${ROOT_CLASS}__private-match-title">プライベートマッチ</div>
        <div class="${ROOT_CLASS}__private-match-description">${privateMatchDescription}</div>
      </button>
    </div>
  `;
}
