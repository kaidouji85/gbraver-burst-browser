import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @param resources リソース管理オブジェクト
 * @param ids data-idをあつめたもの
 * @returns 生成結果
 */
export function rootInnerHTML(resources: Resources, ids: DataIDs): string {
  const closerPath =
    resources.paths.find((v) => v.id === PathIds.CLOSER)?.path ?? "";
  const casualMatchDescription =
    "すべてのプレイヤーでランダムマッチをおこないます";
  const privateMatchHostDescription =
    "プライベートマッチを開催します、ルームIDをゲストに共有してください";
  const privateMatchGuestDescription =
    "ホストから共有されたルームIDを入力して、対戦を開始します";
  return `
    <div class="${ROOT_CLASS}__background" data-id="${ids.backGround}"></div>
    <div class="${ROOT_CLASS}__dialog">
      <img class="${ROOT_CLASS}__closer" alt="閉じる" src="${closerPath}" data-id="${ids.closer}">
      <button class="${ROOT_CLASS}__casual-match" alt="カジュアルマッチをする" data-id="${ids.casualMatchButton}">
        <div class="${ROOT_CLASS}__casual-match-title">カジュアルマッチ</div>
        <div class="${ROOT_CLASS}__casual-match-description">${casualMatchDescription}</div>
      </button>
      <button class="${ROOT_CLASS}__private-match-host" alt="プライベートマッチ（ホスト）をする" data-id="${ids.privateMatchHostButton}">
        <div class="${ROOT_CLASS}__private-match-host-title">プライベートマッチ（ホスト）</div>
        <div class="${ROOT_CLASS}__private-match-host-description">${privateMatchHostDescription}</div>
      </button>
      <button class="${ROOT_CLASS}__private-match-guest" alt="プライベートマッチ（ゲスト）をする" data-id="${ids.privateMatchGuestButton}">
        <div class="${ROOT_CLASS}__private-match-guest-title">プライベートマッチ（ゲスト）</div>
        <div class="${ROOT_CLASS}__private-match-guest-description">${privateMatchGuestDescription}</div>
      </button>
    </div>
  `;
}
