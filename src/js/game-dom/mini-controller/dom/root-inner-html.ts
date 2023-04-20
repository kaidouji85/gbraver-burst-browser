import { ROOT } from "./class-name";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @return 生成結果
 */
export function rootInnerHTML(): string {
  return `
    <div class="${ROOT}__batteries">
      <div class="${ROOT}__battery">0</div>
      <div class="${ROOT}__battery">1</div>
      <div class="${ROOT}__battery">2</div>
      <div class="${ROOT}__battery">3</div>
      <div class="${ROOT}__battery">4</div>
      <div class="${ROOT}__battery">5</div>
    </div>
    <div class="${ROOT}__burst">バースト(b)</div>
    <div class="${ROOT}__pilot">パイロット(p)</div>
  `;
}
