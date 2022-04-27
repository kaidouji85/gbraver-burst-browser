// @flow
import {domUuid} from "../../../uuid/dom-uuid";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import {pushDOMStream} from "../../../dom/push/push-dom";
import type {PushDOM} from "../../../dom/push/push-dom";
import {waitElementLoaded} from "../../../wait/wait-element-loaded";
import {pop} from "../../../dom/animation/pop";
import {Howl} from "howler";
import {createEmptySoundResource, SOUND_IDS} from "../../../resource/sound";
import {Exclusive} from "../../../exclusive/exclusive";
import type {DOMScene} from "../dom-scene";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/stream";
import type {TitleAccount} from "./title-account";
import {escapeHTML} from '../../../dom/escape/escape-html';
import type {BGMManager} from '../../../bgm/bgm-manager';
import {fadeIn, play} from "../../../bgm/bgm-operators";
import type {SoundResource} from "../../../resource/sound";
import {createStreamSource} from "../../../stream/stream";

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
  arcade: string,
  casualMatch: string,
  howToPlay: string,
  config: string,
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
function rootInnerHTML(ids: DataIDs, account: TitleAccount, isApiServerEnable: boolean, termsOfServiceURL: string, privacyPolicyURL: string, contactURL: string): string {
  const loginClassName = (isApiServerEnable && account.type === 'GuestAccount') ?  LOGIN_CLASS : INVISIBLE_LOGIN_CLASS;
  const accountName = account.type === 'LoggedInAccount' ? escapeHTML(account.name) : '';
  const accountClassName = (isApiServerEnable && account.type === 'LoggedInAccount') ? ACCOUNT_CLASS : INVISIBLE_ACCOUNT_CLASS;
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
        <button class="${ROOT_CLASS}__contents__controllers__config" data-id="${ids.config}">設定</button>
        <button class="${ROOT_CLASS}__contents__controllers__how-to-play" data-id="${ids.howToPlay}">遊び方</button>
        <button class="${ROOT_CLASS}__contents__controllers__arcade" data-id="${ids.arcade}">アーケード</button>
        <button class="${casualMatchClassName}" data-id="${ids.casualMatch}">ネット対戦</button>
      </div>
    </div>
    <div class="${ROOT_CLASS}__footer">
      <small class="${ROOT_CLASS}__footer__copy-rights">
        <span class="${ROOT_CLASS}__footer__copy-rights__symbol">&copy;</span>
        <span class="${ROOT_CLASS}__footer__copy-rights__year">2022</span>
        <span class="${ROOT_CLASS}__footer__copy-rights__owner">Pegass85</span>
      </small>
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
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const login = root.querySelector(`[data-id="${ids.login}"]`) ?? document.createElement('div');
  const accountMenu = root.querySelector(`[data-id="${ids.accountMenu}"]`) ?? document.createElement('div');
  const avatarElement = root.querySelector(`[data-id="${ids.avatar}"]`);
  const avatar = (avatarElement instanceof HTMLImageElement) ? avatarElement : new Image();
  const deleteAccount = root.querySelector(`[data-id="${ids.deleteAccount}"]`) ?? document.createElement('div');
  const logout = root.querySelector(`[data-id="${ids.logout}"]`) ?? document.createElement('div');
  const logoElement = root.querySelector(`[data-id="${ids.logo}"]`);
  const logo = (logoElement instanceof HTMLImageElement) ? logoElement : new Image();
  const arcade = root.querySelector(`[data-id="${ids.arcade}"]`) ?? document.createElement('div');
  const casualMatch = root.querySelector(`[data-id="${ids.casualMatch}"]`) ?? document.createElement('div');
  const howToPlay = root.querySelector(`[data-id="${ids.howToPlay}"]`) ?? document.createElement('div');
  const config = root.querySelector(`[data-id="${ids.config}"]`) ?? document.createElement('div');
  return {login, accountMenu, avatar, deleteAccount, logout, logo, arcade, casualMatch, howToPlay, config};
}

/** タイトル */
export class Title implements DOMScene {
  _exclusive: Exclusive;
  _isAccountMenuOpen: boolean;
  _login: HTMLElement;
  _accountMenu: HTMLElement;
  _avatar: HTMLImageElement;
  _deleteAccount: HTMLElement;
  _logout: HTMLElement;
  _root: HTMLElement;
  _arcade: HTMLElement;
  _casualMatch: HTMLElement;
  _howToPlay: HTMLElement;
  _config: HTMLElement;
  _isTitleBackLoaded: Promise<void>;
  _isAvatarLoaded: Promise<void>;
  _isLogoLoaded: Promise<void>;
  _changeValue: typeof Howl;
  _pushButton: typeof Howl;
  _titleBGM: SoundResource;
  _bgm: BGMManager;
  _pushLogin: StreamSource<void>;
  _pushDeleteAccount: StreamSource<void>;
  _pushLogout: StreamSource<void>;
  _pushArcade: StreamSource<void>;
  _pushCasualMatch: StreamSource<void>;
  _pushHowToPlay: StreamSource<void>;
  _pushConfig: StreamSource<void>;
  _unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param bgm BGM管理オブジェクト
   * @param account アカウント情報
   * @param isApiServerEnable APIサーバが利用可能か否か、trueで利用可能である
   * @param termsOfServiceURL 利用規約ページのURL
   * @param privacyPolicyURL プライバシーポリシーページのURL
   * @param contactURL 問い合わせページのURL
   */
  constructor(resources: Resources, bgm: BGMManager, account: TitleAccount, isApiServerEnable: boolean, termsOfServiceURL: string, privacyPolicyURL: string, contactURL: string) {
    this._exclusive = new Exclusive();
    this._isAccountMenuOpen = false;
    const dataIDs = {login: domUuid(), accountMenu: domUuid(), avatar: domUuid(), deleteAccount: domUuid(), logout: domUuid(), logo: domUuid(),
      arcade: domUuid(), casualMatch: domUuid(), howToPlay: domUuid(), config: domUuid()};
    this._root = document.createElement('div');
    this._root.innerHTML = rootInnerHTML(dataIDs, account, isApiServerEnable, termsOfServiceURL, privacyPolicyURL, contactURL);
    this._root.className = ROOT_CLASS;
    const elements = extractElements(this._root, dataIDs);
    this._login = elements.login;
    this._accountMenu = elements.accountMenu;
    this._avatar = elements.avatar;
    this._deleteAccount = elements.deleteAccount;
    this._logout = elements.logout;
    this._arcade = elements.arcade;
    this._casualMatch = elements.casualMatch;
    this._howToPlay = elements.howToPlay;
    this._config = elements.config;

    this._isAvatarLoaded = (account.type === 'LoggedInAccount') ? waitElementLoaded(this._avatar) : Promise.resolve();
    this._avatar.src = (account.type === 'LoggedInAccount') ? account.pictureURL : '';
    
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
    this._titleBGM = resources.sounds.find(v => v.id === SOUND_IDS.TITLE_BGM) ?? createEmptySoundResource();
    this._bgm = bgm;

    this._pushLogin = createStreamSource();
    this._pushDeleteAccount = createStreamSource();
    this._pushLogout = createStreamSource();
    this._pushArcade = createStreamSource();
    this._pushHowToPlay = createStreamSource();
    this._pushCasualMatch = createStreamSource();
    this._pushConfig = createStreamSource();
    this._unsubscribers = [
      pushDOMStream(this._root).subscribe(action => {
        this._onRootPush(action);
      }),
      pushDOMStream(this._login).subscribe(action => {
        this._onLoginPush(action);
      }),
      pushDOMStream(this._avatar).subscribe(action => {
        this._onAvatarPush(action);
      }),
      pushDOMStream(this._deleteAccount).subscribe(action => {
        this._onPushDeleteAccount(action);
      }),
      pushDOMStream(this._logout).subscribe(action => {
        this._onLogoutPush(action);
      }),
      pushDOMStream(this._arcade).subscribe(action => {
        this._onArcadePush(action);
      }),
      pushDOMStream(this._casualMatch).subscribe(action => {
        this._onCasualMatchPush(action);
      }),
      pushDOMStream(this._howToPlay).subscribe(action => {
        this._onHowToPlayPush(action);
      }),
      pushDOMStream(this._config).subscribe(action => {
        this._onConfigPush(action);
      })
    ];
  }

  /** @override */
  destructor(): void {
    this._unsubscribers.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * BGMを再生開始する
   *
   * @return BGM再生が完了したら発火するPromise
   */
  async playBGM(): Promise<void> {
    await this._bgm.do(play(this._titleBGM));
    await this._bgm.do(fadeIn);
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
   * アーケードボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushArcadeNotifier(): Stream<void> {
    return this._pushArcade;
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
   * 設定ボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushConfigNotifier(): Stream<void> {
    return this._pushConfig;
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
   * 
   * @param action アクション
   */
  _onRootPush(action: PushDOM): void {
    action.event.stopPropagation();
    if (this._isAccountMenuOpen) {
      this._closeAccountMenu();
    }
  }

  /**
   * ログインが押された際の処理
   * 
   * @param action アクション
   */
  _onLoginPush(action: PushDOM): void {
    this._exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this._pushButton.play();
      await pop(this._login);
      this._pushLogin.next();
    });
  }

  /**
   * アバターが押された時の処理
   * 
   * @param action アクション
   */
  _onAvatarPush(action: PushDOM): void {
    action.event.preventDefault();
    if (!this._isAccountMenuOpen) {
      action.event.stopPropagation();
      this._changeValue.play();
      pop(this._avatar, 1.2);
      this._openAccountMenu();
    }
  }

  /**
   * アカウント削除を押した時の処理
   * 
   * @param action アクション
   */
  _onPushDeleteAccount(action: PushDOM): void {
    action.event.preventDefault();
    this._changeValue.play();
    this._pushDeleteAccount.next();
  }

  /**
   * ログアウトが押された際の処理
   * 
   * @param action アクション
   */
  _onLogoutPush(action: PushDOM): void {
    action.event.preventDefault();
    this._changeValue.play();
    this._pushLogout.next();
  }
  
  /**
   * アーケードが押された際の処理
   * 
   * @param action アクション
   */
  _onArcadePush(action: PushDOM): void {
    this._exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this._pushButton.play();
      await pop(this._arcade);
      this._pushArcade.next();
    });
  }

  /**
   * カジュアルマッチが押された時の処理
   *
   * @param action アクション
   */
  _onCasualMatchPush(action: PushDOM): void {
    this._exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this._pushButton.play();
      await pop(this._casualMatch);
      this._pushCasualMatch.next();
    });
  }

  /**
   * 遊び方が押された際の処理
   * 
   * @param action アクション
   */
  _onHowToPlayPush(action: PushDOM): void {
    this._exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this._changeValue.play();
      await pop(this._howToPlay);
      this._pushHowToPlay.next();
    });
  }

  /**
   * 設定が押された時の処理
   *
   * @param action アクション
   */
  _onConfigPush(action: PushDOM): void {
    this._exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this._changeValue.play();
      await pop(this._config);
      this._pushConfig.next();
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