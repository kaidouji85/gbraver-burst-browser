import { NPCEnding } from "../src/js/dom-scenes/npc-ending";
import { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";

export default {
  title: "npc-ending",
};
export const Scene: DOMStubStory = domStub((params) => {
  const scene = new NPCEnding(params);
  scene.playBGM();
  return scene.getRootHTMLElement();
});
