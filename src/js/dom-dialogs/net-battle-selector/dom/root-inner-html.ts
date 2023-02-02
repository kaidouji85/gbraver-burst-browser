import { ROOT_CLASS } from "./class-name";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @return 生成結果
 */
export function rootInnerHTML(): string {
  return `
    <div class="${ROOT_CLASS}__background"></div>
    <div class="${ROOT_CLASS}__dialog">
      hello
    </div>
  `;
}
