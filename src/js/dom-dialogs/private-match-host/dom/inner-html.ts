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
  const description =
    "プライベートマッチしたい人に、以下のルームIDを共有してください。";
  return `
    <div class="${ROOT_CLASS}__background"></div>
    <div class="${ROOT_CLASS}__dialog">
      <img class="${ROOT_CLASS}__closer" alt="閉じる" src="${closerPath}">
      <div class="${ROOT_CLASS}__title">プライベートマッチ（ホスト）</div>
      <div class="${ROOT_CLASS}__description">${description}</div>
      <div class="${ROOT_CLASS}__room-id">V1StGXR8_Z5jdHi6B-myT</div>
    </div>
  `;
}
