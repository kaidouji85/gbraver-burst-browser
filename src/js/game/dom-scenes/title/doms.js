// @flow
import {escapeHTML} from "../../../dom/escape-html";
import type {TitleAccount} from "./title-account";

/** ルート要素 class属性 */
export const ROOT_CLASS = 'title';
/** ログインボタン class属性 */
export const LOGIN_CLASS = `${ROOT_CLASS}__login`;
/** ログインボタン 非表示 class属性 */
export const INVISIBLE_LOGIN_CLASS = `${LOGIN_CLASS}--invisible`;
/** アカウント情報 class属性 */
export const ACCOUNT_CLASS = `${ROOT_CLASS}__account`;
/** アカウント情報 非表示 class属性 */
export const INVISIBLE_ACCOUNT_CLASS = `${ACCOUNT_CLASS}--invisible`;
/** アカウントメニュー class属性 */
export const ACCOUNT_MENU_CLASS = `${ROOT_CLASS}__account-menu`;
/** アカウントメニュー 非表示 class属性 */
export const INVISIBLE_ACCOUNT_MENU_CLASS = `${ACCOUNT_MENU_CLASS}--invisible`;
/** カジュアルマッチボタン class属性 */
export const CASUAL_MATCH_CLASS = `${ROOT_CLASS}__casual-match`;
/** カジュアルマッチボタン 非表示 class属性 */
export const INVISIBLE_CASUAL_MATCH_CLASS = `${CASUAL_MATCH_CLASS}--invisible`;

/** data-idを集めたもの */
type DataIDs = {
  login: string,
  accountMenu: string,
  avatar: string,
  deleteAccount: string,
  logout: string,
  logo: string,
  tutorial: string,
  arcade: string,
  casualMatch: string,
  howToPlay: string,
  config: string,
};

/** data-id以外のinnerHTMLジェネレータパラメータ */
export type RootInnerHTMLParams = {
  /** アカウント情報 */
  account: TitleAccount,
  /** APIサーバが利用可能か否か、trueで利用可能である */
  isApiServerEnable: boolean,
  /** 利用規約ページのURL */
  termsOfServiceURL: string,
  /** プライバシーポリシーページのURL */
  privacyPolicyURL: string,
  /** 問い合わせページのURL */
  contactURL: string
};

/**
 * ルート要素のinnerHTML
 * @param ids data-idを集めたもの
 * @param params ids以外のパラメータ
 * @return innerHTML
 */
export function rootInnerHTML(ids: DataIDs, params: RootInnerHTMLParams): string {
  const loginClassName = (params.isApiServerEnable && params.account.type === 'GuestAccount') ?  LOGIN_CLASS : INVISIBLE_LOGIN_CLASS;
  const accountName = params.account.type === 'LoggedInAccount' ? escapeHTML(params.account.name) : '';
  const accountClassName = (params.isApiServerEnable && params.account.type === 'LoggedInAccount') ? ACCOUNT_CLASS : INVISIBLE_ACCOUNT_CLASS;
  const casualMatchClassName = params.isApiServerEnable ? CASUAL_MATCH_CLASS: INVISIBLE_CASUAL_MATCH_CLASS;
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
        <button class="${ROOT_CLASS}__tutorial" data-id="${ids.tutorial}">チュートリアル</button>
        <button class="${ROOT_CLASS}__arcade" data-id="${ids.arcade}">アーケード</button>
        <button class="${casualMatchClassName}" data-id="${ids.casualMatch}">ネット対戦</button>
      </div>
    </div>
    <div class="${ROOT_CLASS}__footer">
      <small class="${ROOT_CLASS}__copy-rights">
        <span class="${ROOT_CLASS}__copy-rights-symbol">&copy;</span>
        <span class="${ROOT_CLASS}__copy-rights-year">2022</span>
        <span class="${ROOT_CLASS}__copy-rights-owner">Pegass85</span>
      </small>
      <small class="${ROOT_CLASS}__music">音楽 魔王魂</small>
      <a class="${ROOT_CLASS}__how-to-play" data-id="${ids.howToPlay}">遊び方</a>
      <a class="${ROOT_CLASS}__terms-of-service" href="${params.termsOfServiceURL}" target="_blank" rel="noopener">利用規約</a>
      <a class="${ROOT_CLASS}__privacy-policy" href="${params.privacyPolicyURL}" target="_blank" rel="noopener">プライバシーポリシー</a>
      <a class="${ROOT_CLASS}__contact" href="${params.contactURL}" target="_blank" rel="noopener">問い合わせ</a>
    </div>
  `;
}

/** ルート要素の子孫要素 */
type Elements = {
  login: HTMLElement,
  accountMenu: HTMLElement,
  avatar: HTMLImageElement,
  deleteAccount: HTMLElement,
  logout: HTMLElement,
  logo: HTMLImageElement,
  tutorial: HTMLElement,
  arcade: HTMLElement,
  casualMatch: HTMLElement,
  howToPlay: HTMLElement,
  config: HTMLElement,
};

/**
 * ルート要素から子孫要素を抽出する
 * 
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const login = root.querySelector(`[data-id="${ids.login}"]`) ?? document.createElement('div');
  const accountMenu = root.querySelector(`[data-id="${ids.accountMenu}"]`) ?? document.createElement('div');
  const avatarElement = root.querySelector(`[data-id="${ids.avatar}"]`);
  const avatar = (avatarElement instanceof HTMLImageElement) ? avatarElement : new Image();
  const deleteAccount = root.querySelector(`[data-id="${ids.deleteAccount}"]`) ?? document.createElement('div');
  const logout = root.querySelector(`[data-id="${ids.logout}"]`) ?? document.createElement('div');
  const logoElement = root.querySelector(`[data-id="${ids.logo}"]`);
  const logo = (logoElement instanceof HTMLImageElement) ? logoElement : new Image();
  const tutorial = root.querySelector(`[data-id="${ids.tutorial}"]`) ?? document.createElement('div');
  const arcade = root.querySelector(`[data-id="${ids.arcade}"]`) ?? document.createElement('div');
  const casualMatch = root.querySelector(`[data-id="${ids.casualMatch}"]`) ?? document.createElement('div');
  const howToPlay = root.querySelector(`[data-id="${ids.howToPlay}"]`) ?? document.createElement('div');
  const config = root.querySelector(`[data-id="${ids.config}"]`) ?? document.createElement('div');
  return {login, accountMenu, avatar, deleteAccount, logout, logo, tutorial, arcade, casualMatch, howToPlay, config};
}
