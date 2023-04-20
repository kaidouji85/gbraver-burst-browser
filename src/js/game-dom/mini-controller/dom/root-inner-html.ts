import { ROOT } from "./class-name";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @return 生成結果
 */
export function rootInnerHTML(): string {
  return `
    <div class="${ROOT}__batteries">
      <button class="${ROOT}__battery">0</button>
      <button class="${ROOT}__battery">1</button>
      <button class="${ROOT}__battery">2</button>
      <button class="${ROOT}__battery">3</button>
      <button class="${ROOT}__battery">4</button>
      <button class="${ROOT}__battery">5</button>
    </div>
    <button class="${ROOT}__burst">バースト(b)</button>
    <button class="${ROOT}__pilot">パイロット(p)</button>
  `;
}
