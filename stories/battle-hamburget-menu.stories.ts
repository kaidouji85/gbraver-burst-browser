import { StoryFn } from "@storybook/html";

import { BattleHamburgerMenu } from "../src/js/game-dom/battle-hamburger-menu";
import { domStub } from "./stub/dom-stub";

export default {
  title: "battle-hamburger-menu",
};

/**
 * 戦闘画面用ハンバーガーメニューのストーリー
 * @param canRetry リトライ可能かどうか、trueでリトライ可能
 * @returns ストーリー
 */
const hamburgerMenuStory = (canRetry: boolean) =>
  domStub((params) => {
    const menu = new BattleHamburgerMenu({ ...params, canRetry });
    menu.show();
    menu.notifyRetry().subscribe(() => {
      console.log("retry");
    });
    menu.notifyEndBattle().subscribe(() => {
      console.log("end battle");
    });
    return menu.getRootHTMLElement();
  });

/** すべてが操作可能 */
export const operatable: StoryFn = hamburgerMenuStory(true);

/** 一部操作不可能 */
export const disabled: StoryFn = hamburgerMenuStory(false);
