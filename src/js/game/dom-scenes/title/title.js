// @flow
import {pushDOMStream} from "../../../dom/event-stream";
import type {Stream, Unsubscriber} from "../../../stream/stream";
import type {DOMScene} from "../dom-scene";
import {onArcadePush} from "./listeners/on-arcade-push";
import {onAvatarPush} from "./listeners/on-avator-push";
import {onCasualMatchPush} from "./listeners/on-casual-match-push";
import {onConfigPush} from "./listeners/on-config-push";
import {onHowToPlayPush} from "./listeners/on-how-to-play-push";
import {onLoginPush} from "./listeners/on-login-push";
import {onLogoutPush} from "./listeners/on-logout-push";
import {onPushDeleteAccount} from "./listeners/on-push-delete-account";
import {onRootPush} from "./listeners/on-root-push";
import {onTutorialPush} from "./listeners/on-tutorial-push";
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
        onRootPush(this.#props, action);
      }),
      pushDOMStream(this.#props.login).subscribe(action => {
        onLoginPush(this.#props, action);
      }),
      pushDOMStream(this.#props.avatar).subscribe(action => {
        onAvatarPush(this.#props, action);
      }),
      pushDOMStream(this.#props.deleteAccount).subscribe(action => {
        onPushDeleteAccount(this.#props, action);
      }),
      pushDOMStream(this.#props.logout).subscribe(action => {
        onLogoutPush(this.#props, action);
      }),
      pushDOMStream(this.#props.tutorial).subscribe(action => {
        onTutorialPush(this.#props, action);
      }),
      pushDOMStream(this.#props.arcade).subscribe(action => {
        onArcadePush(this.#props, action);
      }),
      pushDOMStream(this.#props.casualMatch).subscribe(action => {
        onCasualMatchPush(this.#props, action);
      }),
      pushDOMStream(this.#props.howToPlay).subscribe(action => {
        onHowToPlayPush(this.#props, action);
      }),
      pushDOMStream(this.#props.config).subscribe(action => {
        onConfigPush(this.#props, action);
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
}