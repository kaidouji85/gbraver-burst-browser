// @flow
import {Howl} from "howler";
import type {BGMManager} from '../../../bgm/bgm-manager';
import {fadeIn, play} from "../../../bgm/bgm-operators";
import {pop} from "../../../dom/animation";
import {escapeHTML} from '../../../dom/escape-html';
import type {PushDOM} from "../../../dom/event-stream";
import {pushDOMStream} from "../../../dom/event-stream";
import {Exclusive} from "../../../exclusive/exclusive";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import type {SoundResource} from "../../../resource/sound";
import {createEmptySoundResource, SOUND_IDS} from "../../../resource/sound";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/stream";
import {createStreamSource} from "../../../stream/stream";
import {domUuid} from "../../../uuid/dom-uuid";
import {waitElementLoaded} from "../../../wait/wait-element-loaded";
import type {DOMScene} from "../dom-scene";
import type {TitleAccount} from "./title-account";

/** ルート要素 class属性 */
const ROOT_CLASS = 'title';
/** ログインボタン class属性 */
const LOGIN_CLASS = `${ROOT_CLASS}__header__login`;
/** ログインボタン 非表示 class属性 */
const INVISIBLE_LOGIN_CLASS = `${LOGIN_CLASS}--invisible`;
/** アカウント情報 class属性 */
const ACCOUNT_CLASS = `${ROOT_CLASS}__header__account`;
/** アカウント情報 非表示 class属性 */
const INVISIBLE_ACCOUNT_CLASS = `${ACCOUNT_CLASS}--invisible`;
/** アカウントメニュー class属性 */
const ACCOUNT_MENU_CLASS = `${ACCOUNT_CLASS}__menu`;
/** アカウントメニュー 非表示 class属性 */
const INVISIBLE_ACCOUNT_MENU_CLASS = `${ACCOUNT_MENU_CLASS}--invisible`;
/** チュートリアルボタン class属性 */
const TUTORIAL_CLASS = `${ROOT_CLASS}__contents__controllers__tutorial`;
/** チュートリアルボタン 非表示 class属性 */
const INVISIBLE_TUTORIAL_CLASS = `${TUTORIAL_CLASS}--invisible`;
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
  tutorial: string,
  arcade: string,
  casualMatch: string,
  howToPlay: string,
  config: string,
};

/** data-id以外のinnerHTMLジェネレータパラメータ */
type RootInnerHTMLParams = {
  /** アカウント情報 */
  account: TitleAccount,
  /** APIサーバが利用可能か否か、trueで利用可能である */
  isApiServerEnable: boolean,
  /** チュートリアルが利用可能か否か、trueで利用可能である */
  isTutorialEnable: boolean,
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
function rootInnerHTML(ids: DataIDs, params: RootInnerHTMLParams): string {
  const loginClassName = (params.isApiServerEnable && params.account.type === 'GuestAccount') ?  LOGIN_CLASS : INVISIBLE_LOGIN_CLASS;
  const accountName = params.account.type === 'LoggedInAccount' ? escapeHTML(params.account.name) : '';
  const accountClassName = (params.isApiServerEnable && params.account.type === 'LoggedInAccount') ? ACCOUNT_CLASS : INVISIBLE_ACCOUNT_CLASS;
  const tutorialClassName = params.isTutorialEnable ? TUTORIAL_CLASS : INVISIBLE_TUTORIAL_CLASS;
  const casualMatchClassName = params.isApiServerEnable ? CASUAL_MATCH_CLASS: INVISIBLE_CASUAL_MATCH_CLASS;
  return `
    <div class="${ROOT_CLASS}__header">
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
    </div>
    <div class="${ROOT_CLASS}__contents">
      <img class="${ROOT_CLASS}__contents__logo" data-id="${ids.logo}">
      <div class="${ROOT_CLASS}__contents__controllers">
        <button class="${ROOT_CLASS}__contents__controllers__config" data-id="${ids.config}">設定</button>
        <button class="${ROOT_CLASS}__contents__controllers__how-to-play" data-id="${ids.howToPlay}">遊び方</button>
        <button class="${tutorialClassName}" data-id="${ids.tutorial}">チュートリアル</button>
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
      <a class="${ROOT_CLASS}__footer__terms-of-service" href="${params.termsOfServiceURL}" target="_blank" rel="noopener">利用規約</a>
      <a class="${ROOT_CLASS}__footer__privacy-policy" href="${params.privacyPolicyURL}" target="_blank" rel="noopener">プライバシーポリシー</a>
      <a class="${ROOT_CLASS}__footer__contact" href="${params.contactURL}" target="_blank" rel="noopener">問い合わせ</a>
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
function extractElements(root: HTMLElement, ids: DataIDs): Elements {
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

/** タイトル画面コンストラクタパラメータ */
export type TitleParams = RootInnerHTMLParams & {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** BGM管理オブジェクト */
  bgm: BGMManager
};

/** タイトル */
export class Title implements DOMScene {
  #exclusive: Exclusive;
  #isAccountMenuOpen: boolean;
  #login: HTMLElement;
  #accountMenu: HTMLElement;
  #avatar: HTMLImageElement;
  #deleteAccount: HTMLElement;
  #logout: HTMLElement;
  #root: HTMLElement;
  #tutorial: HTMLElement;
  #arcade: HTMLElement;
  #casualMatch: HTMLElement;
  #howToPlay: HTMLElement;
  #config: HTMLElement;
  #isTitleBackLoaded: Promise<void>;
  #isAvatarLoaded: Promise<void>;
  #isLogoLoaded: Promise<void>;
  #changeValue: typeof Howl;
  #pushButton: typeof Howl;
  #titleBGM: SoundResource;
  #bgm: BGMManager;
  #pushLogin: StreamSource<void>;
  #pushDeleteAccount: StreamSource<void>;
  #pushLogout: StreamSource<void>;
  #pushTutorial: StreamSource<void>;
  #pushArcade: StreamSource<void>;
  #pushCasualMatch: StreamSource<void>;
  #pushHowToPlay: StreamSource<void>;
  #pushConfig: StreamSource<void>;
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param params パラメータ
   */
  constructor(params: TitleParams) {
    this.#exclusive = new Exclusive();
    this.#isAccountMenuOpen = false;
    const dataIDs = {login: domUuid(), accountMenu: domUuid(), avatar: domUuid(), deleteAccount: domUuid(), logout: domUuid(), logo: domUuid(),
      tutorial: domUuid(), arcade: domUuid(), casualMatch: domUuid(), howToPlay: domUuid(), config: domUuid()};
    this.#root = document.createElement('div');
    this.#root.innerHTML = rootInnerHTML(dataIDs, params);
    this.#root.className = ROOT_CLASS;
    const elements = extractElements(this.#root, dataIDs);
    this.#login = elements.login;
    this.#accountMenu = elements.accountMenu;
    this.#avatar = elements.avatar;
    this.#deleteAccount = elements.deleteAccount;
    this.#logout = elements.logout;
    this.#tutorial = elements.tutorial;
    this.#arcade = elements.arcade;
    this.#casualMatch = elements.casualMatch;
    this.#howToPlay = elements.howToPlay;
    this.#config = elements.config;

    this.#isAvatarLoaded = (params.account.type === 'LoggedInAccount') ? waitElementLoaded(this.#avatar) : Promise.resolve();
    this.#avatar.src = (params.account.type === 'LoggedInAccount') ? params.account.pictureURL : '';
    
    this.#isLogoLoaded = waitElementLoaded(elements.logo);
    elements.logo.src = params.resources.paths.find(v => v.id === PathIds.LOGO)?.path ?? '';

    const titleBackImage = new Image();
    this.#isTitleBackLoaded = waitElementLoaded(titleBackImage).then(() => {
      this.#root.style.backgroundImage = `url(${titleBackImage.src})`;
    });
    titleBackImage.src = params.resources.paths.find(v => v.id === PathIds.TITLE_BACK)
      ?.path ?? '';

    this.#pushButton = this.#changeValue = params.resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON)
      ?.sound ?? new Howl();
    this.#changeValue = params.resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE)
      ?.sound ?? new Howl();
    this.#titleBGM = params.resources.sounds.find(v => v.id === SOUND_IDS.TITLE_BGM) ?? createEmptySoundResource();
    this.#bgm = params.bgm;

    this.#pushLogin = createStreamSource();
    this.#pushDeleteAccount = createStreamSource();
    this.#pushLogout = createStreamSource();
    this.#pushTutorial = createStreamSource();
    this.#pushArcade = createStreamSource();
    this.#pushHowToPlay = createStreamSource();
    this.#pushCasualMatch = createStreamSource();
    this.#pushConfig = createStreamSource();
    this.#unsubscribers = [
      pushDOMStream(this.#root).subscribe(action => {
        this.#onRootPush(action);
      }),
      pushDOMStream(this.#login).subscribe(action => {
        this.#onLoginPush(action);
      }),
      pushDOMStream(this.#avatar).subscribe(action => {
        this.#onAvatarPush(action);
      }),
      pushDOMStream(this.#deleteAccount).subscribe(action => {
        this.#onPushDeleteAccount(action);
      }),
      pushDOMStream(this.#logout).subscribe(action => {
        this.#onLogoutPush(action);
      }),
      pushDOMStream(this.#tutorial).subscribe(action => {
        this.#onTutorialPush(action);
      }),
      pushDOMStream(this.#arcade).subscribe(action => {
        this.#onArcadePush(action);
      }),
      pushDOMStream(this.#casualMatch).subscribe(action => {
        this.#onCasualMatchPush(action);
      }),
      pushDOMStream(this.#howToPlay).subscribe(action => {
        this.#onHowToPlayPush(action);
      }),
      pushDOMStream(this.#config).subscribe(action => {
        this.#onConfigPush(action);
      })
    ];
  }

  /** @override */
  destructor(): void {
    this.#unsubscribers.forEach(v => {
      v.unsubscribe();
    });
  }

  /**
   * BGMを再生開始する
   *
   * @return BGM再生が完了したら発火するPromise
   */
  async playBGM(): Promise<void> {
    await this.#bgm.do(play(this.#titleBGM));
    await this.#bgm.do(fadeIn);
  }

  /**
   * ログインボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushLoginNotifier(): Stream<void> {
    return this.#pushLogin;
  }

  /**
   * アカウント削除ボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushDeleteAccountNotifier(): Stream<void> {
    return this.#pushDeleteAccount;
  }

  /**
   * ログアウトボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushLogoutNotifier(): Stream<void> {
    return this.#pushLogout;
  }

  /**
   * チュートリアルボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushTutorialNotifier(): Stream<void> {
    return this.#pushTutorial;
  }

  /**
   * アーケードボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushArcadeNotifier(): Stream<void> {
    return this.#pushArcade;
  }

  /**
   * カジュアルマッチボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushCasualMatchNotifier(): Stream<void> {
    return this.#pushCasualMatch;
  }

  /**
   * 遊び方ボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushHowToPlayNotifier(): Stream<void> {
    return this.#pushHowToPlay;
  }

  /**
   * 設定ボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushConfigNotifier(): Stream<void> {
    return this.#pushConfig;
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * 各種リソースの読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all([
      this.#isTitleBackLoaded,
      this.#isAvatarLoaded,
      this.#isLogoLoaded,
    ]);
  }

  /**
   * ルート要素が押された時の処理
   * 本画面でウインドウ外が押された時に呼び出される想定
   * 
   * @param action アクション
   */
  #onRootPush(action: PushDOM): void {
    action.event.stopPropagation();
    if (this.#isAccountMenuOpen) {
      this.#closeAccountMenu();
    }
  }

  /**
   * ログインが押された際の処理
   * 
   * @param action アクション
   */
  #onLoginPush(action: PushDOM): void {
    this.#exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this.#pushButton.play();
      await pop(this.#login);
      this.#pushLogin.next();
    });
  }

  /**
   * アバターが押された時の処理
   * 
   * @param action アクション
   */
  #onAvatarPush(action: PushDOM): void {
    action.event.preventDefault();
    if (!this.#isAccountMenuOpen) {
      action.event.stopPropagation();
      this.#changeValue.play();
      pop(this.#avatar, 1.2);
      this.#openAccountMenu();
    }
  }

  /**
   * アカウント削除を押した時の処理
   * 
   * @param action アクション
   */
  #onPushDeleteAccount(action: PushDOM): void {
    action.event.preventDefault();
    this.#changeValue.play();
    this.#pushDeleteAccount.next();
  }

  /**
   * ログアウトが押された際の処理
   * 
   * @param action アクション
   */
  #onLogoutPush(action: PushDOM): void {
    action.event.preventDefault();
    this.#changeValue.play();
    this.#pushLogout.next();
  }

  /**
   * チュートリアルが押された際の処理
   *
   * @param action アクション
   */
  #onTutorialPush(action: PushDOM): void {
    this.#exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this.#pushButton.play();
      await pop(this.#tutorial);
      this.#pushTutorial.next();
    });
  }
  
  /**
   * アーケードが押された際の処理
   * 
   * @param action アクション
   */
  #onArcadePush(action: PushDOM): void {
    this.#exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this.#pushButton.play();
      await pop(this.#arcade);
      this.#pushArcade.next();
    });
  }

  /**
   * カジュアルマッチが押された時の処理
   *
   * @param action アクション
   */
  #onCasualMatchPush(action: PushDOM): void {
    this.#exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this.#pushButton.play();
      await pop(this.#casualMatch);
      this.#pushCasualMatch.next();
    });
  }

  /**
   * 遊び方が押された際の処理
   * 
   * @param action アクション
   */
  #onHowToPlayPush(action: PushDOM): void {
    this.#exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this.#changeValue.play();
      await pop(this.#howToPlay);
      this.#pushHowToPlay.next();
    });
  }

  /**
   * 設定が押された時の処理
   *
   * @param action アクション
   */
  #onConfigPush(action: PushDOM): void {
    this.#exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this.#changeValue.play();
      await pop(this.#config);
      this.#pushConfig.next();
    });
  }

  /**
   * アカウントメニューを開く
   */
  #openAccountMenu(): void {
    this.#isAccountMenuOpen = true;
    this.#accountMenu.className = ACCOUNT_MENU_CLASS;
  }

  /**
   * アカウントメニューを閉じる
   */
  #closeAccountMenu(): void {
    this.#isAccountMenuOpen = false;
    this.#accountMenu.className = INVISIBLE_ACCOUNT_MENU_CLASS;
  }
}