import { BattleHamburgerMenu } from "../src/js/game-dom/battle-hamburger-menu";
import { domStub } from "./stub/dom-stub";

export default {
  title: "battle-hamburger-menu",
};

/**
 * 戦闘画面用ハンバーガーメニューのストーリー
 * @param isEnabled 操作可能かどうか、trueで操作可能
 * @returns ストーリー
 */
const hamburgerMenuStory = (isEnabled: boolean) =>
  domStub((params) => {
    const menu = new BattleHamburgerMenu({ ...params, canRetry: isEnabled });
    if (isEnabled) {
      menu.enableBattleSimulator();
    } else {
      menu.disableBattleSimulator();
    }
    menu.show();
    menu.notifyBattleSimulatorStart().subscribe(() => {
      console.log("battle simulator start");
    });
    menu.notifyRetry().subscribe(() => {
      console.log("retry");
    });
    menu.notifyEndBattle().subscribe(() => {
      console.log("end battle");
    });
    return menu.getRootHTMLElement();
  });

/** すべてが操作可能 */
export const enabled = hamburgerMenuStory(true);

/** 一部操作不可能 */
export const disabled = hamburgerMenuStory(false);
