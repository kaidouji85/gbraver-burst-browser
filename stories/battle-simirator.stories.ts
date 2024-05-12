import { StoryFn } from "@storybook/html";

import { BattleSimulator } from "../src/js/dom-dialogs/battle-simulator";
import { domStub } from "./stub/dom-stub";

export default {
  title: "battle-simulator",
};

/** ダイアログ表示 */
export const dialog: StoryFn = domStub(() => {
  const simulator = new BattleSimulator();
  return simulator.getRootHTMLElement();
});
