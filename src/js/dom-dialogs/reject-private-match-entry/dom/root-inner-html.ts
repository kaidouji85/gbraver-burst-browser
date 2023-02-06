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
  return `
    <div class="${ROOT_CLASS}__background"></div>
    <div class="${ROOT_CLASS}__dialog">
      <img class="${ROOT_CLASS}__closer" src="${closerPath}" alt="閉じる">
      reject private match entry
    </div>
  `;
}
