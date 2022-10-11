// @flow
import {pop} from "../../../dom/animation";
import type {PushDOM} from "../../../dom/event-stream";
import {pushDOMStream} from "../../../dom/event-stream";
import type {Stream, Unsubscriber} from "../../../stream/stream";
import type {DOMScene} from "../dom-scene";
import {ACCOUNT_MENU_CLASS, INVISIBLE_ACCOUNT_MENU_CLASS} from "./doms";
import type {CreateTitlePropsParams, TitleProps} from "./props";
import {createTitleProps} from "./props";

/** タイトル画面コンストラクタパラメータ */
export type TitleParams = CreateTitlePropsParams;

/** タイトル */
export class Title implements DOMScene {
  #props: TitleProps;
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param params パラメータ
   */
  constructor(params: TitleParams) {
    this.#props = createTitleProps(params);
    this.#unsubscribers = [
      pushDOMStream(this.#props.root).subscribe(action => {
        this.#onRootPush(action);
      }),
      pushDOMStream(this.#props.login).subscribe(action => {
        this.#onLoginPush(action);
      }),
      pushDOMStream(this.#props.avatar).subscribe(action => {
        this.#onAvatarPush(action);
      }),
      pushDOMStream(this.#props.deleteAccount).subscribe(action => {
        this.#onPushDeleteAccount(action);
      }),
      pushDOMStream(this.#props.logout).subscribe(action => {
        this.#onLogoutPush(action);
      }),
      pushDOMStream(this.#props.tutorial).subscribe(action => {
        this.#onTutorialPush(action);
      }),
      pushDOMStream(this.#props.arcade).subscribe(action => {
        this.#onArcadePush(action);
      }),
      pushDOMStream(this.#props.casualMatch).subscribe(action => {
        this.#onCasualMatchPush(action);
      }),
      pushDOMStream(this.#props.howToPlay).subscribe(action => {
        this.#onHowToPlayPush(action);
      }),
      pushDOMStream(this.#props.config).subscribe(action => {
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
    return this.#props.pushLogin;
  }

  /**
   * アカウント削除ボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushDeleteAccountNotifier(): Stream<void> {
    return this.#props.pushDeleteAccount;
  }

  /**
   * ログアウトボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushLogoutNotifier(): Stream<void> {
    return this.#props.pushLogout;
  }

  /**
   * チュートリアルボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushTutorialNotifier(): Stream<void> {
    return this.#props.pushTutorial;
  }

  /**
   * アーケードボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushArcadeNotifier(): Stream<void> {
    return this.#props.pushArcade;
  }

  /**
   * カジュアルマッチボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushCasualMatchNotifier(): Stream<void> {
    return this.#props.pushCasualMatch;
  }

  /**
   * 遊び方ボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushHowToPlayNotifier(): Stream<void> {
    return this.#props.pushHowToPlay;
  }

  /**
   * 設定ボタン押下通知
   *
   * @return イベント通知ストリーム
   */
  pushConfigNotifier(): Stream<void> {
    return this.#props.pushConfig;
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * 各種リソースの読み込みが完了するまで待つ
   *
   * @return 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all([
      this.#props.isTitleBackLoaded,
      this.#props.isAvatarLoaded,
      this.#props.isLogoLoaded,
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
    if (this.#props.isAccountMenuOpen) {
      this.#closeAccountMenu();
    }
  }

  /**
   * ログインが押された際の処理
   * 
   * @param action アクション
   */
  #onLoginPush(action: PushDOM): void {
    this.#props.exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this.#props.pushButton.play();
      await pop(this.#props.login);
      this.#props.pushLogin.next();
    });
  }

  /**
   * アバターが押された時の処理
   * 
   * @param action アクション
   */
  #onAvatarPush(action: PushDOM): void {
    action.event.preventDefault();
    if (!this.#props.isAccountMenuOpen) {
      action.event.stopPropagation();
      this.#props.changeValue.play();
      pop(this.#props.avatar, 1.2);
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
    this.#props.changeValue.play();
    this.#props.pushDeleteAccount.next();
  }

  /**
   * ログアウトが押された際の処理
   * 
   * @param action アクション
   */
  #onLogoutPush(action: PushDOM): void {
    action.event.preventDefault();
    this.#props.changeValue.play();
    this.#props.pushLogout.next();
  }

  /**
   * チュートリアルが押された際の処理
   *
   * @param action アクション
   */
  #onTutorialPush(action: PushDOM): void {
    this.#props.exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this.#props.pushButton.play();
      await pop(this.#props.tutorial);
      this.#props.pushTutorial.next();
    });
  }
  
  /**
   * アーケードが押された際の処理
   * 
   * @param action アクション
   */
  #onArcadePush(action: PushDOM): void {
    this.#props.exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this.#props.pushButton.play();
      await pop(this.#props.arcade);
      this.#props.pushArcade.next();
    });
  }

  /**
   * カジュアルマッチが押された時の処理
   *
   * @param action アクション
   */
  #onCasualMatchPush(action: PushDOM): void {
    this.#props.exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this.#props.pushButton.play();
      await pop(this.#props.casualMatch);
      this.#props.pushCasualMatch.next();
    });
  }

  /**
   * 遊び方が押された際の処理
   * 
   * @param action アクション
   */
  #onHowToPlayPush(action: PushDOM): void {
    this.#props.exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this.#props.pushHowToPlay.next();
    });
  }

  /**
   * 設定が押された時の処理
   *
   * @param action アクション
   */
  #onConfigPush(action: PushDOM): void {
    this.#props.exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      this.#props.changeValue.play();
      await pop(this.#props.config);
      this.#props.pushConfig.next();
    });
  }

  /**
   * アカウントメニューを開く
   */
  #openAccountMenu(): void {
    this.#props.isAccountMenuOpen = true;
    this.#props.accountMenu.className = ACCOUNT_MENU_CLASS;
  }

  /**
   * アカウントメニューを閉じる
   */
  #closeAccountMenu(): void {
    this.#props.isAccountMenuOpen = false;
    this.#props.accountMenu.className = INVISIBLE_ACCOUNT_MENU_CLASS;
  }
}