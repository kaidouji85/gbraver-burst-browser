import { escapeHTML } from "../../../dom/escape-html";
import { ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @param mailAddress メールアドレス
 * @return ルート要素innerHTML
 */
export function rootInnerHTML(ids: DataIDs, mailAddress: string): string {
  const escapedMailAddress = escapeHTML(mailAddress);
  return `
    <div class="${ROOT_CLASS}__title">メール認証を完了させてください</div>
    <div class="${ROOT_CLASS}__caption">以下手順でメール認証を完了させてから、ゲームを開始してください</div>
    <ol class="${ROOT_CLASS}__procedure">
      <li class="${ROOT_CLASS}__operation">${escapedMailAddress}に送信された認証メールを開く</li>
      <li class="${ROOT_CLASS}__operation">認証メールに記載されたVerify Linkを開く</li>
      <li class="${ROOT_CLASS}__operation">Gブレイバーバーストを再読み込みする</li>
    </ol>
    <div class="${ROOT_CLASS}__controllers">
      <button class="${ROOT_CLASS}__goto-title" data-id="${ids.gotoTitle}">タイトルへ</button>
      <button class="${ROOT_CLASS}__reload" data-id="${ids.reload}">再読み込み</button>
    </div>
  `;
}