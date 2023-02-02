import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path";
import { ROOT_CLASS } from "./class-name";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function rootInnerHTML(resources: Resources): string {
  const closerPath =
    resources.paths.find((v) => v.id === PathIds.CLOSER)?.path ?? "";
  const casualMatchDescription = "すべてのプレイヤーでランダムマッチをおこないます";
  const privateMatchDescription = "合言葉を共有して、知り合いと対戦します";
  return `
    <div class="${ROOT_CLASS}__background"></div>
    <div class="${ROOT_CLASS}__dialog">
      <img class="${ROOT_CLASS}__closer" alt="閉じる" src="${closerPath}">
      <div class="${ROOT_CLASS}__casual-match">
        <div class="${ROOT_CLASS}__casual-match-title">カジュアルマッチ</div>
        <div class="${ROOT_CLASS}__casual-match-description">${casualMatchDescription}</div>
        <button class="${ROOT_CLASS}__casual-match-selector">カジュアルマッチする</button>
      </div>
      <div class="${ROOT_CLASS}__private-match">
        <div class="${ROOT_CLASS}__private-match-title">プライベートマッチ</div>
        <div class="${ROOT_CLASS}__private-match-description">${privateMatchDescription}</div>
        <button class="${ROOT_CLASS}__private-match-selector">カジュアルマッチする</button>
      </div>
    </div>
  `;
}
