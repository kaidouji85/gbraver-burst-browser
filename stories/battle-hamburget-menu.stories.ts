import { BattleHamburgerMenu } from "../src/js/game-dom/battle-hamburger-menu";
import { domStub } from "./stub/dom-stub";

export default {
  title: "battle-hamburger-menu",
};

/** 戦闘画面用のハンバーガーメニュー */
export const menu = domStub((params) => {
  const menu = new BattleHamburgerMenu(params);
  menu.show();
  return menu.getRootHTMLElement();
});
