import { PathIds } from "../ids";
import { PathConfig } from "../resource";

/** 戦闘画面用ハンバーガーメニュー パス設定 */
export const BattleHamburgerMenuConfigs: PathConfig[] = [
  {
    id: PathIds.BATTLE_HAMBURGER_MENU,
    path: (root) => `${root.get()}/battle-humburger-menu.svg`,
  },
];
