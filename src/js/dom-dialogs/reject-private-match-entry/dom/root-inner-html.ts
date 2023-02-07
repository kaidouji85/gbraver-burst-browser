import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path";
import { ROOT_CLASS } from "./class-name";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function rootInnerHTML(resources: Resources) {
  const closerPath =
    resources.paths.find((v) => v.id === PathIds.CLOSER)?.path ?? "";
  const description = "ホストに連絡して、ルームを既に破棄していないか、先にマッチメイクしたプレイヤーがいないかを、確認してください。";
  return `
    <div class="${ROOT_CLASS}__background"></div>
    <div class="${ROOT_CLASS}__dialog">
      <img class="${ROOT_CLASS}__closer" src="${closerPath}" alt="閉じる">
      <div class="${ROOT_CLASS}__title">マッチメイク失敗</div>
      <div class="${ROOT_CLASS}__description">${description}</div>
      <button class="${ROOT_CLASS}__close-dialog">閉じる</button>
    </div>
  `;
}
