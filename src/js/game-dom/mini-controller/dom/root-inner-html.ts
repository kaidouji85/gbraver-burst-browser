import { ROOT } from "./class-name";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @return 生成結果
 */
export function rootInnerHTML(): string {
  return `
    <div class="${ROOT}__attack-label">コウゲキ</div>
    <div class="${ROOT}__battery-buttons">
      <button class="${ROOT}__battery-button">0</button>
      <button class="${ROOT}__battery-button">1</button>
      <button class="${ROOT}__battery-button">2</button>
      <button class="${ROOT}__battery-button">3</button>
      <button class="${ROOT}__battery-button">4</button>
      <button class="${ROOT}__battery-button">5</button>
    </div>
    <div class="${ROOT}__burst-label">バースト</div>
    <button class="${ROOT}__burst-button">発動</button>
    <div class="${ROOT}__pilot-label">パイロット</div>
    <button class="${ROOT}__pilot-button">発動</button>
  `;
}
