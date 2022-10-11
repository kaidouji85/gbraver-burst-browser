// @flow
import {Howl} from "howler";
import {pop} from "../../../dom/animation";
import type {PushDOM} from "../../../dom/event-stream";
import {pushDOMStream} from "../../../dom/event-stream";
import {Exclusive} from "../../../exclusive/exclusive";
import type {Resources} from "../../../resource";
import {PathIds} from "../../../resource/path";
import {SOUND_IDS} from "../../../resource/sound";
import type {Stream, StreamSource, Unsubscriber} from "../../../stream/stream";
import {createStreamSource} from "../../../stream/stream";
import {domUuid} from "../../../uuid/dom-uuid";
import {waitElementLoaded} from "../../../wait/wait-element-loaded";
import type {DOMScene} from "../dom-scene";
import type {RootInnerHTMLParams} from "./doms";
import {
  ACCOUNT_MENU_CLASS, 
  extractElements, 
  INVISIBLE_ACCOUNT_MENU_CLASS, 
  rootInnerHTML,
  ROOT_CLASS
} from "./doms";

/** タイトル画面コンストラクタパラメータ */
export type TitleParams = RootInnerHTMLParams & {
  /** リソース管理オブジェクト */
  resources: Resources
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