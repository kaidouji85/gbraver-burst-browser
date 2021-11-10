// @flow

import {domUuid} from "../../../uuid/dom-uuid";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import {pushDOMStream} from "../../../dom/push/push-dom";
import {waitElementLoaded} from "../../../wait/wait-element-loaded";
import {pop} from "../../../dom/animation/pop";
import {Howl} from "howler";
import {SOUND_IDS} from "../../../resource/sound";
import {Exclusive} from "../../../exclusive/exclusive";
import type {DOMScene} from "../dom-scene";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/core";
import {RxjsStreamSource} from "../../../stream/rxjs";
import type {TitleUser} from "./title-user";

/** ルート要素 class属性 */
const ROOT_CLASS = 'title';
/** ログインボタン class属性 */
const LOGIN_CLASS = `${ROOT_CLASS}__login`;
/** ログインボタン 非表示 class属性 */
const INVISIBLE_LOGIN_CLASS = `${LOGIN_CLASS}--invisible`;
/** アカウント情報 class属性 */
const ACCOUNT_CLASS = `${ROOT_CLASS}__account`;
/** アカウント情報 非表示 class属性 */
const INVISIBLE_ACCOUNT_CLASS = `${ACCOUNT_CLASS}--invisible`;
/** アカウントメニュー class属性 */
const ACCOUNT_MENU_CLASS = `${ACCOUNT_CLASS}__menu`;
/** アカウントメニュー 非表示 class属性 */
const INVISIBLE_ACCOUNT_MENU_CLASS = `${ACCOUNT_MENU_CLASS}--invisible`;
/** カジュアルマッチボタン class属性 */
const CASUAL_MATCH_CLASS = `${ROOT_CLASS}__contents__controllers__casual-match`;
/** カジュアルマッチボタン 非表示 class属性 */
const INVISIBLE_CASUAL_MATCH_CLASS = `${CASUAL_MATCH_CLASS}--invisible`

/** data-idを集めたもの */
type DataIDs = {
  login: string,
  accountMenu: string,
  avatar: string,
  deleteAccount: string,
  logout: string,
  logo: string,
  gameStart: string,
  casualMatch: string,
  howToPlay: string,
};

/**
 * ルート要素のinnerHTML
 * @param ids data-idを集めたもの
 * @param account アカウント情報
 * @param isApiServerEnable APIサーバが利用可能か否か、trueで利用可能である
 * @param termsOfServiceURL 利用規約ページのURL
 * @param privacyPolicyURL プライバシーポリシーページのURL
 * @param contactURL 問い合わせページのURL
 * @return innerHTML
 */
function rootInnerHTML(ids: DataIDs, account: TitleUser, isApiServerEnable: boolean, termsOfServiceURL: string, privacyPolicyURL: string, contactURL: string): string {
  const loginClassName = (isApiServerEnable && account.type === 'GuestUser') ?  LOGIN_CLASS : INVISIBLE_LOGIN_CLASS;
  const accountName = account.type === 'LoggedInUser' ? account.name : '';
  const accountClassName = (isApiServerEnable && account.type === 'LoggedInUser') ? ACCOUNT_CLASS : INVISIBLE_ACCOUNT_CLASS;
  const casualMatchClassName = isApiServerEnable ? CASUAL_MATCH_CLASS: INVISIBLE_CASUAL_MATCH_CLASS;
  return `
    <button data-id="${ids.login}" class="${loginClassName}">ログイン</button>
    <div class="${accountClassName}">
      <img class="${accountClassName}__avatar" data-id="${ids.avatar}" >
      <div class="${INVISIBLE_ACCOUNT_MENU_CLASS}" data-id="${ids.accountMenu}">
        <div class="${ACCOUNT_MENU_CLASS}__name">
          <div class="${ACCOUNT_MENU_CLASS}__name__prefix">アカウント名</div>
          <div class="${ACCOUNT_MENU_CLASS}__name__value">${accountName}</div>
        </div>
        <div class="${ACCOUNT_MENU_CLASS}__separation"></div>
        <div class="${ACCOUNT_MENU_CLASS}__delete-account" data-id="${ids.deleteAccount}">アカウント削除</div>
        <div class="${ACCOUNT_MENU_CLASS}__logout" data-id="${ids.logout}">ログアウト</div>
      </div>
    </div>
    <div class="${ROOT_CLASS}__contents">
      <img class="${ROOT_CLASS}__contents__logo" data-id="${ids.logo}">
      <div class="${ROOT_CLASS}__contents__controllers">
        <button class="${ROOT_CLASS}__contents__controllers__how-to-play" data-id="${ids.howToPlay}">遊び方</button>
        <button class="${ROOT_CLASS}__contents__controllers__game-start" data-id="${ids.gameStart}">ゲームスタート</button>
        <button class="${casualMatchClassName}" data-id="${ids.casualMatch}">ネット対戦</button>
      </div>
    </div>
    <div class="${ROOT_CLASS}__footer">
      <span class="${ROOT_CLASS}__footer__copy-rights">(C) 2020 Yuusuke Takeuchi</span>
      <a class="${ROOT_CLASS}__footer__terms-of-service" href="${termsOfServiceURL}" target="_blank" rel="noopener">利用規約</a>
      <a class="${ROOT_CLASS}__footer__privacy-policy" href="${privacyPolicyURL}" target="_blank" rel="noopener">プライバシーポリシー</a>
      <a class="${ROOT_CLASS}__footer__contact" href="${contactURL}" target="_blank" rel="noopener">問い合わせ</a>
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
  gameStart: HTMLElement,
  casualMatch: HTMLElement,
  howToPlay: HTMLElement,
};

/**
 * ルート要素から子孫要素を抽出する
 * 
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const login = root.querySelector(`[data-id="${ids.login}"]`) ?? document.createElement('div');
  const accountMenu = root.querySelector(`[data-id="${ids.accountMenu}"]`) ?? document.createElement('div');
  const avatarElement = root.querySelector(`[data-id="${ids.avatar}"]`);
  const avatar = (avatarElement instanceof HTMLImageElement) ? avatarElement : new Image();
  const deleteAccount = root.querySelector(`[data-id="${ids.deleteAccount}"]`) ?? document.createElement('div');
  const logout = root.querySelector(`[data-id="${ids.logout}"]`) ?? document.createElement('div');
  const logoElement = root.querySelector(`[data-id="${ids.logo}"]`);
  const logo = (logoElement instanceof HTMLImageElement) ? logoElement : new Image();
  const gameStart = root.querySelector(`[data-id="${ids.gameStart}"]`) ?? document.createElement('div');
  const casualMatch = root.querySelector(`[data-id="${ids.casualMatch}"]`) ?? document.createElement('div');
  const howToPlay = root.querySelector(`[data-id="${ids.howToPlay}"]`) ?? document.createElement('div');
  return {login, accountMenu, avatar, deleteAccount, logout, logo, gameStart, casualMatch, howToPlay};
}

/** タイトル */
export class Title implements DOMScene {
  _exclusive: Exclusive;
  _isAccountMenuOpen: boolean;
  _login: HTMLElement;
  _accountMenu: HTMLElement;
  _avatar: HTMLElement;
  _deleteAccount: HTMLElement;
  _logout: HTMLElement;
  _root: HTMLElement;
  _gameStart: HTMLElement;
  _casualMatch: HTMLElement;
  _howToPlay: HTMLElement;
  _isTitleBackLoaded: Promise<void>;
  _isAvatarLoaded: Promise<void>;
  _isLogoLoaded: Promise<void>;
  _changeValue: typeof Howl;
  _pushButton: typeof Howl;
  _pushLogin: StreamSource<void>;
  _pushDeleteAccount: StreamSource<void>;
  _pushLogout: StreamSource<void>;
  _pushGameStart: StreamSource<void>;
  _pushCasualMatch: StreamSource<void>;
  _pushHowToPlay: StreamSource<void>;
  _unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param account アカウント情報
   * @param isApiServerEnable APIサーバが利用可能か否か、trueで利用可能である
   * @param termsOfServiceURL 利用規約ページのURL
   * @param privacyPolicyURL プライバシーポリシーページのURL
   * @param contactURL 問い合わせページのURL
   */
  constructor(resources: Resources, account: TitleUser, isApiServerEnable: boolean, termsOfServiceURL: string, privacyPolicyURL: string, contactURL: string) {
    this._exclusive = new Exclusive();
    this._isAccountMenuOpen = false;
    const dataIDs = {login: domUuid(), accountMenu: domUuid(), avatar: domUuid(), deleteAccount: domUuid(), logout: domUuid(), logo: domUuid(),
      gameStart: domUuid(), casualMatch: domUuid(), howToPlay: domUuid(),termsOfService: domUuid(), privacyPolicy: domUuid()};
    this._root = document.createElement('div');
    this._root.innerHTML = rootInnerHTML(dataIDs, account, isApiServerEnable, termsOfServiceURL, privacyPolicyURL, contactURL);
    this._root.className = ROOT_CLASS;
    const elements = extractElements(this._root, dataIDs);
    this._login = elements.login;
    this._accountMenu = elements.accountMenu;
    this._avatar = elements.avatar;
    this._deleteAccount = elements.deleteAccount;
    this._logout = elements.logout;
    this._gameStart = elements.gameStart;
    this._casualMatch = elements.casualMatch;
    this._howToPlay = elements.howToPlay;

    this._isAvatarLoaded = (account.type === 'LoggedInUser') ? waitElementLoaded(this._avatar) : Promise.resolve();
    this._avatar.src = (account.type === 'LoggedInUser') ? account.pictureURL : '';

    this._isLogoLoaded = waitElementLoaded(elements.logo);
    elements.logo.src = resources.paths.find(v => v.id === PathIds.LOGO)?.path ?? '';

    const titleBackImage = new Image();
    this._isTitleBackLoaded = waitElementLoaded(titleBackImage).then(() => {
      this._root.style.backgroundImage = `url(${titleBackImage.src})`;
    });
    titleBackImage.src = resources.paths.find(v => v.id === PathIds.TITLE_BACK)
      ?.path ?? '';

    this._pushButton = this._changeValue = resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)
      ?.sound ?? new Howl();
    this._changeValue = resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)
      ?.sound ?? new Howl();

    this._pushLogin = new RxjsStreamSource();
    this._pushDeleteAccount = new RxjsStreamSource();
    this._pushLogout = new RxjsStreamSource();
    this._pushGameStart = new RxjsStreamSource();
    this._pushHowToPlay = new RxjsStreamSource();
    this._pushCasualMatch = new RxjsStreamSource();
    this._unsubscribers = [
      pushDOMStream(this._root, false, true).subscribe(() => {
        this._onRootPush();
      }),
      pushDOMStream(this._deleteAccount).subscribe(() => {
        this._onPushDeleteAccount();
      }),
      pushDOMStream(this._login).subscribe(() => {
        this._onLoginPush();
      }),
      pushDOMStream(this._avatar).subscribe(() => {
        this._onAvatarPush();
      }),
      pushDOMStream(this._logout).subscribe(() => {
        this._onLogoutPush();
      }),
      pushDOMStream(this._gameStart).subscribe(() => {
        this._onGameStartPush();
      }),
      pushDOMStream(this._casualMatch).subscribe(() => {
        this._onCasualMatchPush();
      }),
      pushDOMStream(this._howToPlay).subscribe(() => {
        this._onHowToPlayPush();
      })
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._unsubscribers.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * ログインボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushLoginNotifier(): Stream<void> {
    return this._pushLogin;
  }

  /**
   * アカウント削除ボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushDeleteAccountNotifier(): Stream<void> {
    return this._pushDeleteAccount;
  }

  /**
   * ログアウトボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushLogoutNotifier(): Stream<void> {
    return this._pushLogout;
  }

  /**
   * ゲームスタートボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushGameStartNotifier(): Stream<void> {
    return this._pushGameStart;
  }

  /**
   * カジュアルマッチボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushCasualMatchNotifier(): Stream<void> {
    return this._pushCasualMatch;
  }

  /**
   * 遊び方ボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushHowToPlayNotifier(): Stream<void> {
    return this._pushHowToPlay;
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this._root;
  }

  /**
   * 各種リソースの読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all([
      this._isTitleBackLoaded,
      this._isAvatarLoaded,
      this._isLogoLoaded,
    ]);
  }

  /**
   * ルート要素が押された時の処理
   * 本画面でウインドウ外が押された時に呼び出される想定
   */
  _onRootPush(): void {
    this._isAccountMenuOpen && this._closeAccountMenu();
  }

  /**
   * ゲームスタートが押された際の処理
   */
  _onGameStartPush(): void {
    this._exclusive.execute(async (): Promise<void> => {
      this._pushButton.play();
      await pop(this._gameStart);
      this._pushGameStart.next();
    });
  }

  /**
   * カジュアルマッチが押された時の処理
   * @private
   */
  _onCasualMatchPush(): void {
    this._exclusive.execute(async (): Promise<void> => {
      this._pushButton.play();
      await pop(this._casualMatch);
      this._pushCasualMatch.next();
    });
  }

  /**
   * 遊び方が押された際の処理
   */
  _onHowToPlayPush(): void {
    this._exclusive.execute(async (): Promise<void> => {
      this._changeValue.play();
      await pop(this._howToPlay);
      this._pushHowToPlay.next();
    });
  }

  /**
   * ログインが押された際の処理
   */
  _onLoginPush(): void {
    this._exclusive.execute(async (): Promise<void> => {
      this._pushButton.play();
      await pop(this._login);
      this._pushLogin.next();
    });
  }

  /**
   * ログアウトが押された際の処理
   */
  _onLogoutPush(): void {
    this._exclusive.execute(async (): Promise<void> => {
      this._changeValue.play();
      this._pushLogout.next();
    });
  }

  /**
   * アバターが押された時の処理
   */
  _onAvatarPush(): void {
    this._exclusive.execute(async (): Promise<void> => {
      this._isAccountMenuOpen ? this._closeAccountMenu() : this._openAccountMenu();
    });
  }

  /**
   * アカウント削除を押した時の処理
   */
  _onPushDeleteAccount(): void {
    this._exclusive.execute(async (): Promise<void> => {
      this._changeValue.play();
      this._pushDeleteAccount.next();
    });
  }

  /**
   * アカウントメニューを開く
   */
  _openAccountMenu(): void {
    this._isAccountMenuOpen = true;
    this._accountMenu.className = ACCOUNT_MENU_CLASS;
  }

  /**
   * アカウントメニューを閉じる
   */
  _closeAccountMenu(): void {
    this._isAccountMenuOpen = false;
    this._accountMenu.className = INVISIBLE_ACCOUNT_MENU_CLASS;
  }
}