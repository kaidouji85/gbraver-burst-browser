import { createBattleHamburgerMenuProps } from "./procedure/create-battle-hamburger-menu-props";
import { BattleHamburgerMenuProps } from "./props";

/** 戦闘画面用のハンバーガーメニュー */
export class BattleHamburgerMenu {
  /** プロパティ */
  #props: BattleHamburgerMenuProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createBattleHamburgerMenuProps();
  }

  /**
   * ルート要素を取得する
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
