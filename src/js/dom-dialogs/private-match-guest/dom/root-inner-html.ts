import { ROOT_CLASS } from "./class-name";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @return 生成結果
 */
export function rootInnerHtml(): string {
  const entryDescription = "ルームIDを入力してください。";
  return `
    <div class="${ROOT_CLASS}__background"></div>
    <div class="${ROOT_CLASS}__dialog">
      <div class="${ROOT_CLASS}__entry-form">
        <div class="${ROOT_CLASS}__entry-description">${entryDescription}</div>
        <input class="${ROOT_CLASS}__room-id" type="text">
        <button class="${ROOT_CLASS}__enter">プライベートマッチ開始</button>
      </div>
    </div>
  `;
}
