import { Unsubscribable } from "rxjs";

import { bindEventListeners } from "./procedure/bind-event-listeners";
import {
  BattleHamburgerMenuPropsCreatorParams,
  createBattleHamburgerMenuProps,
} from "./procedure/create-battle-hamburger-menu-props";
import { hiddenMenu } from "./procedure/hidden-menu";
import { BattleHamburgerMenuProps } from "./props";

/** 戦闘画面用ハンバーガーメニュー生成パラメーター */
type BattleHamburgerMenuParams = BattleHamburgerMenuPropsCreatorParams;

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
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsubscribers.forEach((unsubscriber) => unsubscriber.unsubscribe());
  }

  /**
   * メニューを非表示にする
   */
  hiddenMenu(): void {
    hiddenMenu(this.#props);
  }

  /**
   * ルート要素を取得する
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
