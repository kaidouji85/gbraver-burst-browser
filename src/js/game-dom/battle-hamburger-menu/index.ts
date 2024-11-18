import { Observable, Unsubscribable } from "rxjs";

import { bindEventListeners } from "./procedure/bind-event-listeners";
import {
  BattleHamburgerMenuPropsCreatorParams,
  createBattleHamburgerMenuProps,
} from "./procedure/create-battle-hamburger-menu-props";
import { hidden } from "./procedure/hidden";
import { show } from "./procedure/show";
import { BattleHamburgerMenuProps } from "./props";

/** 戦闘画面用ハンバーガーメニュー生成パラメーター */
export type BattleHamburgerMenuParams = BattleHamburgerMenuPropsCreatorParams;

/** 戦闘画面用ハンバーガーメニュー */
export class BattleHamburgerMenu {
  /** プロパティ */
  #props: BattleHamburgerMenuProps;
  /** アンサブスクライバー */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param params パラメーター
   */
  constructor(params: BattleHamburgerMenuParams) {
    this.#props = createBattleHamburgerMenuProps(params);
    this.#unsubscribers = bindEventListeners(this.#props);
  }

  /**
   * ハンバーガーメニューを表示する
   */
  show() {
    show(this.#props);
  }

  /**
   * ハンバーガーメニューを非表示にする
   */
  hidden() {
    hidden(this.#props);
  }

  /**
   * バトルシミュレーター開始通知
   * @returns 通知ストリーム
   */
  notifyBattleSimulatorStart(): Observable<void> {
    return this.#props.battleSimulatorStartNotifier;
  }

  /**
   * リトライ通知
   * @returns 通知ストリーム
   */
  notifyRetry(): Observable<void> {
    return this.#props.retryNotifier;
  }

  /**
   * バトル終了通知
   * @returns 通知ストリーム
   */
  notifyEndBattle(): Observable<void> {
    return this.#props.endBattleNotifier;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsubscribers.forEach((unsubscriber) => unsubscriber.unsubscribe());
  }

  /**
   * ルート要素を取得する
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
