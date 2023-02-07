import { escapeHTML } from "../../../dom/escape-html";
import type { TitleAccount } from "../title-account";
import {
  ACCOUNT_CLASS,
  NET_BATTLE_CLASS,
  INVISIBLE_ACCOUNT_CLASS,
  INVISIBLE_ACCOUNT_MENU_CLASS,
  INVISIBLE_NET_BATTLE_CLASS,
  INVISIBLE_LOGIN_CLASS,
  LOGIN_CLASS,
  ROOT_CLASS,
} from "./class-name";
import type { DataIDs } from "./data-ids";

/** data-id以外のinnerHTMLジェネレータパラメータ */
export type RootInnerHTMLParams = {
  /** アカウント情報 */
  account: TitleAccount;

  /** APIサーバが利用可能か否か、trueで利用可能である */
  isApiServerEnable: boolean;

  /** 遊び方スライドのURL */
  howToPlayURL: string;

  /** 利用規約ページのURL */
  termsOfServiceURL: string;

  /** プライバシーポリシーページのURL */
  privacyPolicyURL: string;

  /** 問い合わせページのURL */
  contactURL: string;
};

/**
 * ルート要素のinnerHTML
 * @param ids data-idを集めたもの
 * @param params ids以外のパラメータ
 * @return innerHTML
 */
export function rootInnerHTML(
  ids: DataIDs,
  params: RootInnerHTMLParams
): string {
  const loginClassName =
    params.isApiServerEnable && params.account.type === "GuestAccount"
      ? LOGIN_CLASS
      : INVISIBLE_LOGIN_CLASS;
  const accountName =
    params.account.type === "LoggedInAccount"
      ? escapeHTML(params.account.name)
      : "";
  const accountClassName =
    params.isApiServerEnable && params.account.type === "LoggedInAccount"
      ? ACCOUNT_CLASS
      : INVISIBLE_ACCOUNT_CLASS;
  const netBattleClassName = params.isApiServerEnable
    ? NET_BATTLE_CLASS
    : INVISIBLE_NET_BATTLE_CLASS;
  return `
    <div class="${ROOT_CLASS}__header">
      <button data-id="${ids.login}" class="${loginClassName}">ログイン</button>
      <div class="${accountClassName}">
        <img class="${ROOT_CLASS}__avatar" data-id="${ids.avatar}" >
        <div class="${INVISIBLE_ACCOUNT_MENU_CLASS}" data-id="${ids.accountMenu}">
          <div class="${ROOT_CLASS}__account-name">
            <div class="${ROOT_CLASS}__account-name-prefix">アカウント名</div>
            <div class="${ROOT_CLASS}__account-name-value">${accountName}</div>
          </div>
          <div class="${ROOT_CLASS}__account-menu-separation"></div>
          <div class="${ROOT_CLASS}__delete-account" data-id="${ids.deleteAccount}">アカウント削除</div>
          <div class="${ROOT_CLASS}__logout" data-id="${ids.logout}">ログアウト</div>
        </div>
      </div>
    </div>
    <div class="${ROOT_CLASS}__contents">
      <img class="${ROOT_CLASS}__logo" data-id="${ids.logo}">
      <div class="${ROOT_CLASS}__game-menu">
        <button class="${ROOT_CLASS}__config" data-id="${ids.config}">設定</button>
        <button class="${ROOT_CLASS}__arcade" data-id="${ids.arcade}">アーケード</button>
        <button class="${netBattleClassName}" data-id="${ids.netBattle}">ネット対戦</button>
        <button class="${ROOT_CLASS}__tutorial" data-id="${ids.tutorial}">チュートリアル</button>
      </div>
    </div>
    <div class="${ROOT_CLASS}__footer">
      <small class="${ROOT_CLASS}__copy-rights">
        <span class="${ROOT_CLASS}__copy-rights-symbol">&copy;</span>
        <span class="${ROOT_CLASS}__copy-rights-year">2022</span>
        <span class="${ROOT_CLASS}__copy-rights-owner">Pegass85</span>
      </small>
      <small class="${ROOT_CLASS}__music">音楽 魔王魂</small>
      <a class="${ROOT_CLASS}__how-to-play" href="${params.howToPlayURL}" target="_blank" rel="noopener">遊び方</a>
      <a class="${ROOT_CLASS}__terms-of-service" href="${params.termsOfServiceURL}" target="_blank" rel="noopener">利用規約</a>
      <a class="${ROOT_CLASS}__privacy-policy" href="${params.privacyPolicyURL}" target="_blank" rel="noopener">プライバシーポリシー</a>
      <a class="${ROOT_CLASS}__contact" href="${params.contactURL}" target="_blank" rel="noopener">問い合わせ</a>
    </div>
  `;
}
