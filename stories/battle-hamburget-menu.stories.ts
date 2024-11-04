import { BattleHamburgerMenu } from "../src/js/game-dom/battle-hamburger-menu";
import { domStub } from "./stub/dom-stub";

export default {
  title: "battle-hamburger-menu",
};

/** 戦闘画面用のハンバーガーメニュー */
export const menu = domStub(() => {
  const menu = new BattleHamburgerMenu();
  return menu.getRootHTMLElement();
});
