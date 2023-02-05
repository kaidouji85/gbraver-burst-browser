import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path";
import { ROOT_CLASS } from "./class-name";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
export function rootInnerHtml(resources: Resources): string {
  const closerPath =
    resources.paths.find((v) => v.id === PathIds.CLOSER)?.path ?? "";
  const entryDescription = "ホストから共有されたルームIDを、入力してください。";
  return `
    <div class="${ROOT_CLASS}__background"></div>
    <div class="${ROOT_CLASS}__dialog">
      <img class="${ROOT_CLASS}__closer" src="${closerPath}">
      <div class="${ROOT_CLASS}__entry-form">
        <div class="${ROOT_CLASS}__entry-title">プライベートマッチ（ゲスト）</div>
        <div class="${ROOT_CLASS}__entry-description">${entryDescription}</div>
        <input class="${ROOT_CLASS}__room-id" type="text">
        <button class="${ROOT_CLASS}__enter">プライベートマッチ開始</button>
      </div>
    </div>
  `;
}
