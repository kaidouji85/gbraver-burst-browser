import type { Stream, Unsubscriber } from "../../stream/stream";
import type { DOMScene } from "../dom-scene";
import { bindEventListeners } from "./listeners";
import type { CreateTitlePropsParams, TitleProps } from "./props";
import { createTitleProps } from "./props";

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
    this.#unsubscribers = bindEventListeners(this.#props);
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
    await Promise.all([this.#props.isTitleBackLoaded, this.#props.isAvatarLoaded, this.#props.isLogoLoaded]);
  }

}