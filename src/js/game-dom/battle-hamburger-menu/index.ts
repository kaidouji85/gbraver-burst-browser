import { Observable, Unsubscribable } from "rxjs";

import { bindEventListeners } from "./procedure/bind-event-listeners";
import { close } from "./procedure/close";
import {
  BattleHamburgerMenuPropsCreatorParams,
  createBattleHamburgerMenuProps,
} from "./procedure/create-battle-hamburger-menu-props";
import { disableStatusOpening } from "./procedure/disable-status-opening";
import { disabledBattleSimulator } from "./procedure/disabled-battle-simulator";
import { enableBattleSimulator } from "./procedure/enable-battle-simulator";
import { enableStatusOpening } from "./procedure/enable-status-opening";
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
   * メニューを閉じる
   */
  close() {
    close(this.#props);
  }

  /**
   * バトルシミュレーターを選択可能にする
   */
  enableBattleSimulator() {
    enableBattleSimulator(this.#props);
  }

  /**
   * バトルシミュレーターを選択不能にする
   */
  disableBattleSimulator() {
    disabledBattleSimulator(this.#props);
  }

  /**
   * ステータスを開く系の項目を選択可能にする
   */
  enableStatusOpening() {
    enableStatusOpening(this.#props);
  }

  /**
   * ステータスを開く系の項目を選択不可にする
   */
  disableStatusOpening() {
    disableStatusOpening(this.#props);
  }

  /**
   * バトルシミュレーター開始通知
   * @returns 通知ストリーム
   */
  notifyBattleSimulatorStart(): Observable<void> {
    return this.#props.battleSimulatorStartNotifier;
  }

  /**
   * プレイヤーステータスを開く通知
   * @returns 通知ストリーム
   */
  notifyPlayerStatusOpening(): Observable<void> {
    return this.#props.playerStatusOpeningNotifier;
  }

  /**
   * 敵ステータスを開く通知
   * @returns 通知ストリーム
   */
  notifyEnemyStatusOpening(): Observable<void> {
    return this.#props.enemyStatusOpeningNotifier;
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
