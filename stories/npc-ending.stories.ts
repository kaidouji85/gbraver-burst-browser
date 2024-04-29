import { StoryFn } from "@storybook/html";

import { NPCEnding } from "../src/js/dom-scenes/npc-ending";
import { domStub } from "./stub/dom-stub";

export default {
  title: "npc-ending",
};

/** シーン表示 */
export const Scene: StoryFn = domStub((params) => {
  const scene = new NPCEnding(params);
  scene.playBGM();
  return scene.getRootHTMLElement();
});
