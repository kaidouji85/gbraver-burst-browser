import { createBGMManager } from "../src/js/bgm/bgm-manager";
import { NPCEnding } from "../src/js/dom-scenes/npc-ending";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";

export default {
  title: "npc-ending",
};
export const Scene: DOMStubStory = domStub((resources, se) => {
  const bgm = createBGMManager();
  const scene = new NPCEnding({ resources, se, bgm });
  scene.playBGM();
  return scene.getRootHTMLElement();
});
