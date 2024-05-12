import { StoryFn } from "@storybook/html";

import { BattleSimulator } from "../src/js/dom-dialogs/battle-simulator";
import { domStub } from "./stub/dom-stub";

export default {
  title: "battle-simulator",
};

/** ダイアログ表示 */
export const dialog: StoryFn = domStub((params) => {
  const simulator = new BattleSimulator(params);
  return simulator.getRootHTMLElement();
});
