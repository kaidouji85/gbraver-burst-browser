import { Observable, Unsubscribable } from "rxjs";

import type { DOMScene } from "../dom-scene";
import { bindEventListeners } from "./procedures";
import type { CreateTitlePropsParams, TitleProps } from "./props";
import { createTitleProps } from "./props";

/** タイトル画面コンストラクタパラメータ */
export type TitleParams = CreateTitlePropsParams;

/** タイトル */
export class Title implements DOMScene {
  #props: TitleProps;
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: TitleParams) {
    this.#props = createTitleProps(params);
    this.#unsubscribers = bindEventListeners(this.#props);
  }

  /** @override */
  destructor(): void {
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /**
   * ログインボタン押下通知
   * @returns イベント通知ストリーム
   */
  notifyLogin(): Observable<void> {
    return this.#props.pushLogin;
  }

  /**
   * アカウント削除ボタン押下通知
   * @returns イベント通知ストリーム
   */
  notifyAccountDeletion(): Observable<void> {
    return this.#props.pushDeleteAccount;
  }

  /**
   * ログアウトボタン押下通知
   * @returns イベント通知ストリーム
   */
  notifyLogout(): Observable<void> {
    return this.#props.pushLogout;
  }

  /**
   * チュートリアルボタン押下通知
   * @returns イベント通知ストリーム
   */
  notifyTutorial(): Observable<void> {
    return this.#props.pushTutorial;
  }

  /**
   * ストーリーボタン押下通知
   * @returns イベント通知ストリーム
   */
  notifyStory(): Observable<void> {
    return this.#props.pushStory;
  }

  /**
   * アーケードボタン押下通知
   * @returns イベント通知ストリーム
   */
  notifyArcade(): Observable<void> {
    return this.#props.pushArcade;
  }

  /**
   * ネット対戦ボタン押下通知
   * @returns イベント通知ストリーム
   */
  notifyNetBattle(): Observable<void> {
    return this.#props.pushNetBattle;
  }

  /**
   * 設定ボタン押下通知
   * @returns イベント通知ストリーム
   */
  notifyConfig(): Observable<void> {
    return this.#props.pushConfig;
  }

  /**
   * ルートHTML要素を取得する
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * 各種リソースの読み込みが完了するまで待つ
   * @returns 待機結果
   */
  async waitUntilLoaded(): Promise<void> {
    await Promise.all([
      this.#props.isTitleBackLoaded,
      this.#props.isAvatarLoaded,
      this.#props.isLogoLoaded,
      this.#props.isHelpIconLoaded,
    ]);
  }
}
